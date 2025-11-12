import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import metadataFile from './metadata.json';

import './App.css'

function App() {
const [nodes, setNodes] = useState([]);
const [edges, setEdges] = useState([]);


// Load from localStorage if available, otherwise from metadata.json
useEffect(() => {
const stored = localStorage.getItem('diagram-state');
if (stored) {
try {
const parsed = JSON.parse(stored);
setNodes(parsed.nodes || []);
setEdges(parsed.edges || []);
return;
} catch (e) {
console.warn('Failed to parse stored diagram state, falling back to metadata.json');
}
}


setNodes(metadataFile.nodes || []);
setEdges(metadataFile.edges || []);
}, []);


// persist
useEffect(() => {
localStorage.setItem('diagram-state', JSON.stringify({ nodes, edges }));
}, [nodes, edges]);


const onNodesChange = useCallback((changes) => {
setNodes((nds) => applyNodeChanges(changes, nds));
}, []);


const onEdgesChange = useCallback((changes) => {
setEdges((eds) => applyEdgeChanges(changes, eds));
}, []);


const onConnect = useCallback((connection) => {
setEdges((eds) => addEdge({ ...connection, id: `e${Date.now()}` }, eds));
}, []);


// helpers used by Sidebar
const addNode = (nodePayload) => {
const id = nodePayload.id || `${Date.now()}`;
const newNode = {
id,
type: 'default',
position: nodePayload.position || { x: 50, y: 50 },
data: { label: nodePayload.label || 'New Node' }
};
setNodes((nds) => nds.concat(newNode));
};


const updateNode = (id, data) => {
setNodes((nds) => nds.map(n => n.id === id ? { ...n, data: { ...n.data, ...data } } : n));
};

const removeNode = (id) => {
setNodes((nds) => nds.filter(n => n.id !== id));
setEdges((eds) => eds.filter(e => e.source !== id && e.target !== id));
};


const addEdgeManual = ({ source, target, type }) => {
if (!source || !target) return;
const id = `e${Date.now()}`;
const newEdge = { id, source, target, type: type || 'smoothstep' };
setEdges((eds) => eds.concat(newEdge));
};


const removeEdge = (id) => {
setEdges((eds) => eds.filter(e => e.id !== id));
};


return (
<ReactFlowProvider>
<div className="app-root">
<Sidebar
nodes={nodes}
edges={edges}
onAddNode={addNode}
onUpdateNode={updateNode}
onRemoveNode={removeNode}
onAddEdge={addEdgeManual}
onRemoveEdge={removeEdge}
/>


<main className="diagram-area">
<Diagram
nodes={nodes}
edges={edges}
onNodesChange={onNodesChange}
onEdgesChange={onEdgesChange}
onConnect={onConnect}
/>
</main>
</div>
</ReactFlowProvider>
);
}


export default App;


