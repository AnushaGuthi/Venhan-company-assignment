import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';


function Diagram({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) {
return (
<div style={{ height: '100%', width: '100%' }}>
<ReactFlow
nodes={nodes}
edges={edges}
onNodesChange={onNodesChange}
onEdgesChange={onEdgesChange}
onConnect={onConnect}
fitView
attributionPosition="bottom-left"
>
<Background />
<MiniMap />
<Controls />
</ReactFlow>
</div>
);
}


export default Diagram;