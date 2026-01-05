const FloatingCubes = () => {
  return (
    <>
      {/* Top left cube */}
      <div className="absolute top-20 left-10 animate-float-slow opacity-80" style={{ perspective: '1000px' }}>
        <div className="cube-3d" style={{ width: '40px', height: '40px' }}>
          <div className="cube-face cube-face-front" style={{ width: '40px', height: '40px', transform: 'translateZ(20px)' }} />
          <div className="cube-face cube-face-back" style={{ width: '40px', height: '40px', transform: 'rotateY(180deg) translateZ(20px)' }} />
          <div className="cube-face cube-face-right" style={{ width: '40px', height: '40px', transform: 'rotateY(90deg) translateZ(20px)' }} />
          <div className="cube-face cube-face-left" style={{ width: '40px', height: '40px', transform: 'rotateY(-90deg) translateZ(20px)' }} />
          <div className="cube-face cube-face-top" style={{ width: '40px', height: '40px', transform: 'rotateX(90deg) translateZ(20px)' }} />
          <div className="cube-face cube-face-bottom" style={{ width: '40px', height: '40px', transform: 'rotateX(-90deg) translateZ(20px)' }} />
        </div>
      </div>

      {/* Top right cube */}
      <div className="absolute top-32 right-20 animate-float-delayed opacity-70" style={{ perspective: '1000px' }}>
        <div className="cube-3d" style={{ width: '30px', height: '30px', animationDuration: '15s' }}>
          <div className="cube-face cube-face-front" style={{ width: '30px', height: '30px', transform: 'translateZ(15px)' }} />
          <div className="cube-face cube-face-back" style={{ width: '30px', height: '30px', transform: 'rotateY(180deg) translateZ(15px)' }} />
          <div className="cube-face cube-face-right" style={{ width: '30px', height: '30px', transform: 'rotateY(90deg) translateZ(15px)' }} />
          <div className="cube-face cube-face-left" style={{ width: '30px', height: '30px', transform: 'rotateY(-90deg) translateZ(15px)' }} />
          <div className="cube-face cube-face-top" style={{ width: '30px', height: '30px', transform: 'rotateX(90deg) translateZ(15px)' }} />
          <div className="cube-face cube-face-bottom" style={{ width: '30px', height: '30px', transform: 'rotateX(-90deg) translateZ(15px)' }} />
        </div>
      </div>

      {/* Bottom left large cube */}
      <div className="absolute bottom-40 left-20 animate-float opacity-60" style={{ perspective: '1000px' }}>
        <div className="cube-3d" style={{ width: '60px', height: '60px', animationDuration: '12s' }}>
          <div className="cube-face cube-face-front" style={{ width: '60px', height: '60px', transform: 'translateZ(30px)' }} />
          <div className="cube-face cube-face-back" style={{ width: '60px', height: '60px', transform: 'rotateY(180deg) translateZ(30px)' }} />
          <div className="cube-face cube-face-right" style={{ width: '60px', height: '60px', transform: 'rotateY(90deg) translateZ(30px)' }} />
          <div className="cube-face cube-face-left" style={{ width: '60px', height: '60px', transform: 'rotateY(-90deg) translateZ(30px)' }} />
          <div className="cube-face cube-face-top" style={{ width: '60px', height: '60px', transform: 'rotateX(90deg) translateZ(30px)' }} />
          <div className="cube-face cube-face-bottom" style={{ width: '60px', height: '60px', transform: 'rotateX(-90deg) translateZ(30px)' }} />
        </div>
      </div>

      {/* Right side small cube */}
      <div className="absolute bottom-60 right-40 animate-float-slow opacity-50" style={{ perspective: '1000px' }}>
        <div className="cube-3d" style={{ width: '25px', height: '25px', animationDuration: '18s' }}>
          <div className="cube-face cube-face-front" style={{ width: '25px', height: '25px', transform: 'translateZ(12.5px)' }} />
          <div className="cube-face cube-face-back" style={{ width: '25px', height: '25px', transform: 'rotateY(180deg) translateZ(12.5px)' }} />
          <div className="cube-face cube-face-right" style={{ width: '25px', height: '25px', transform: 'rotateY(90deg) translateZ(12.5px)' }} />
          <div className="cube-face cube-face-left" style={{ width: '25px', height: '25px', transform: 'rotateY(-90deg) translateZ(12.5px)' }} />
          <div className="cube-face cube-face-top" style={{ width: '25px', height: '25px', transform: 'rotateX(90deg) translateZ(12.5px)' }} />
          <div className="cube-face cube-face-bottom" style={{ width: '25px', height: '25px', transform: 'rotateX(-90deg) translateZ(12.5px)' }} />
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-muted-foreground/20 animate-float-delayed" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-muted-foreground/30 animate-float-slow" />
      <div className="absolute top-1/2 right-10 w-2 h-2 rounded-full bg-primary/40 animate-float" />
    </>
  );
};

export default FloatingCubes;
