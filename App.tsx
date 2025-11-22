import React from 'react';
import { DragonBackground, DragonBorder, Orb, DragonWave } from './components/DragonVisuals';
import { Chat } from './components/Chat';
import { useLiveApi } from './hooks/use-live-api';
import { ConnectionState } from './types';

const App: React.FC = () => {
  const { connect, disconnect, connectionState, messages, volume, userInterimInput } = useLiveApi();
  
  const isConnected = connectionState === ConnectionState.CONNECTED;
  const isConnecting = connectionState === ConnectionState.CONNECTING;

  const toggleConnection = () => {
    if (isConnected || isConnecting) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-black">
      <DragonBackground />

      {/* Header */}
      <header className="w-full p-4 z-20 flex justify-between items-center border-b border-dragon-gold/20 bg-black/30 backdrop-blur-md shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-dragon-gold flex items-center justify-center bg-dragon-red shadow-lg">
                <span className="text-dragon-gold font-serif font-bold text-lg">D</span>
            </div>
            <div>
                <h1 className="font-serif text-xl text-dragon-gold tracking-widest leading-none">DRAGON SAGE</h1>
                <p className="text-[10px] text-dragon-jade uppercase tracking-widest opacity-80">Voice of the Ancients</p>
            </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-dragon-gold/20">
             <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-dragon-jade shadow-[0_0_8px_#00a86b]' : 'bg-red-900'}`}></div>
             <span className="text-xs uppercase tracking-wider text-dragon-gold/70 font-serif">
                 {connectionState}
             </span>
        </div>
      </header>

      {/* Main Content - Chat History */}
      <main className="flex-1 w-full max-w-4xl flex flex-col relative z-10 min-h-0 my-2 px-4">
         <DragonBorder className="flex-1 bg-black/20 backdrop-blur-sm flex flex-col overflow-hidden">
            <Chat messages={messages} />
         </DragonBorder>
      </main>

      {/* Speech Recognition Box (Interim Results) */}
      <div className="w-full max-w-4xl px-4 relative z-20 mb-2 shrink-0 min-h-[60px] flex items-center justify-center">
        {isConnected ? (
             <div className={`w-full text-center transition-all duration-300 ${userInterimInput ? 'opacity-100' : 'opacity-50'}`}>
                {userInterimInput ? (
                    <p className="text-dragon-gold text-xl font-serif tracking-wide drop-shadow-md leading-relaxed">
                       "{userInterimInput}"
                    </p>
                ) : (
                    <p className="text-dragon-gold/40 text-sm uppercase tracking-[0.2em] animate-pulse">
                        Listening to the wind...
                    </p>
                )}
             </div>
        ) : (
             <p className="text-dragon-red/40 text-sm uppercase tracking-[0.2em]">
                Silence
             </p>
        )}
      </div>

      {/* Footer / Controls Area */}
      <div className="w-full h-48 relative z-20 flex flex-col justify-end shrink-0">
        {/* Wave Visualizer Background for Footer */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-dragon-dark/80 to-transparent pointer-events-none">
            <DragonWave isListening={isConnected} volume={volume} />
        </div>

        {/* Control Orb */}
        <div className="relative z-10 flex justify-center items-end pb-8">
             <div className="flex flex-col items-center gap-4 group cursor-pointer" onClick={toggleConnection}>
                <Orb active={isConnected} volume={volume} />
                <div className="text-dragon-gold/60 text-sm font-serif tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isConnected ? 'END SESSION' : 'BEGIN COMMUNION'}
                </div>
            </div>
        </div>
      </div>

      {/* Connection Error Modal */}
      {connectionState === ConnectionState.ERROR && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <DragonBorder className="bg-dragon-dark p-8 max-w-md text-center shadow-2xl shadow-dragon-red/20">
                <h3 className="text-dragon-red text-xl font-serif mb-4 uppercase tracking-widest">Connection Severed</h3>
                <p className="text-gray-400 mb-6 font-sans">The spiritual link was interrupted. Please ensure the gateway (microphone) is open.</p>
                <button 
                    onClick={() => {
                        disconnect();
                        connect();
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-dragon-red to-dragon-charcoal hover:from-red-800 hover:to-black text-dragon-gold border border-dragon-gold/50 rounded-sm transition-all font-serif tracking-widest uppercase shadow-lg"
                >
                    Reconnect
                </button>
            </DragonBorder>
        </div>
      )}
    </div>
  );
};

export default App;