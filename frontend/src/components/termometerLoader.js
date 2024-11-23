import React from 'react';

const TermometerLoader = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-4 bg-slate-800/50 rounded-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 animate-loader" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 animate-loader-delayed" />
    </div>
  );
};

export default TermometerLoader;
