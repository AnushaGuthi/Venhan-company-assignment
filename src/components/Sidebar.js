import React, { useState } from 'react';



function Sidebar({ nodes, edges, onAddNode, onUpdateNode, onRemoveNode, onAddEdge, onRemoveEdge }) {
const [nodeForm, setNodeForm] = useState({ id: '', label: '', x: 50, y: 50 });
const [edgeForm, setEdgeForm] = useState({ source: '', target: '', type: 'smoothstep' });


const handleAddNode = (e) => {
e.preventDefault();
const payload = {
id: nodeForm.id || `${Date.now()}`,
label: nodeForm.label || 'New Node',
position: { x: Number(nodeForm.x), y: Number(nodeForm.y) }
};
onAddNode(payload);
setNodeForm({ id: '', label: '', x: 50, y: 50 });
};

const handleAddEdge = (e) => {
    e.preventDefault();
    onAddEdge(edgeForm);
    setEdgeForm({ source: '', target: '', type: 'smoothstep' });
};


return (
<aside className="sidebar">
<h3>Metadata Controls</h3>


<form onSubmit={handleAddNode} className="card">
    <h4>Add Node</h4>
    <label>ID (optional)</label>
    <input value={nodeForm.id} onChange={(e) => setNodeForm(prev => ({ ...prev, id: e.target.value }))} />
    <label>Label</label>
    <input value={nodeForm.label} onChange={(e) => setNodeForm(prev => ({ ...prev, label: e.target.value }))} required />
    <label>Position X</label>
    <input type="number" value={nodeForm.x} onChange={(e) => setNodeForm(prev => ({ ...prev, x: e.target.value }))} />
    <label>Position Y</label>
    <input type="number" value={nodeForm.y} onChange={(e) => setNodeForm(prev => ({ ...prev, y: e.target.value }))} />
    <button type="submit">Add Node</button>
</form>


<form onSubmit={handleAddEdge} className="card">
    <h4>Add Edge</h4>
    <label>Source (node id)</label>
    <input value={edgeForm.source} onChange={(e) => setEdgeForm(prev => ({ ...prev, source: e.target.value }))} required />
    <label>Target (node id)</label>
    <input value={edgeForm.target} onChange={(e) => setEdgeForm(prev => ({ ...prev, target: e.target.value }))} required />
    <label>Type</label>
    <input value={edgeForm.type} onChange={(e) => setEdgeForm(prev => ({ ...prev, type: e.target.value }))} />
    <button type="submit">Add Edge</button>
</form>

<div className="card">
    <h4>Nodes</h4>
    <ul className="list">
        {nodes.map(n => (
        <li key={n.id}>
        <strong>{n.id}</strong>: {n.data?.label || '(no label)'}
        <div className="row">
            <button onClick={() => {
            const newLabel = prompt('New label', n.data?.label || '');
            if (newLabel !== null) onUpdateNode(n.id, { label: newLabel });
             }}>Edit</button>
            <button onClick={() => onRemoveNode(n.id)}>Delete</button>
        </div>
        </li>
         ))}
    </ul>
</div>


<div className="card">
    <h4>Edges</h4>
    <ul className="list">
{edges.map(e => (
<li key={e.id}>
<strong>{e.id}</strong>: {e.source} → {e.target}
<div className="row">
<button onClick={() => onRemoveEdge(e.id)}>Delete</button>
</div>
</li>
))}
</ul>
</div>

<div className="card">
<h4>Quick Actions</h4>
<button onClick={() => { localStorage.removeItem('diagram-state'); window.location.reload(); }}>Reset to metadata.json</button>
</div>
</aside>
);
}


export default Sidebar;