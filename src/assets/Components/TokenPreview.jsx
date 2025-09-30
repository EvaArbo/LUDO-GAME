import React from "react";

const PreviewToken = ({ color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ width: 36, height: 36, borderRadius: 18, background: color, border: '2px solid rgba(0,0,0,0.12)' }} />
    <span style={{ textTransform: 'capitalize' }}>{color}</span>
  </div>
);

function TokenPreview() {
  return (
    <div className="token-preview" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
      <div><h3>Red</h3><PreviewToken color="#e74c3c" /></div>
      <div><h3>Green</h3><PreviewToken color="#2ecc71" /></div>
      <div><h3>Yellow</h3><PreviewToken color="#f1c40f" /></div>
      <div><h3>Blue</h3><PreviewToken color="#3498db" /></div>
    </div>
  );
}

export default TokenPreview;
