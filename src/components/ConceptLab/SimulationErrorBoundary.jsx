import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default class SimulationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Simulation Visualizer Error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white rounded-3xl p-6 text-slate-900 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[260px]">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>

          <div className="space-y-1 max-w-md">
            <h3 className="text-sm font-extrabold text-slate-900">
              Sedang memuat simulasi...
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Terjadi penyesuaian parameter simulasi. Klik tombol di bawah untuk memuat ulang visualisator dengan parameter default aman.
            </p>
          </div>

          <button
            onClick={this.handleReload}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Muat Ulang Simulasi 🔄</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
