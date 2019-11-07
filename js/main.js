window.onload = function () {

  const paper = Snap('#animated-svg');

  paper.attr({
    viewBox:"0,0,338,60"
  });

  let PATHS = [
    { name: 'icon', path: "m23.409473864464,60.002243907654c11.8465757,0 21.4094741,-9.56289844 21.4094741,-21.4094741c0,-11.846576 -9.562898,-21.409474 -21.409474,-21.409474s-21.409474,9.562898 -21.409474,21.409474c0,11.846576 9.562899,21.409474 21.409474,21.409474l-1e-7,1e-7zm14.368136,-21.837664l-8.944402,-7.754987c-0.237883046,-0.237883046 -0.285459655,-0.57091931 -0.0475766091,-0.808802355c0.190306436,-0.190306436 0.57091931,-0.237883046 0.761225746,-0.0475766092l9.80078148,8.61136625c0.237883046,0.237883046 0.237883046,0.618495919 0,0.856378964l-9.753205,8.611367c-0.237883046,0.190306436 -0.57091931,0.190306436 -0.761225746,-0.0475766091c-0.237883046,-0.237883046 -0.237883046,-0.618495919 0.0475766091,-0.808802355l8.94440252,-7.75498729c0.237883,-0.237884 0.237883,-0.618497 -0.047577,-0.85638l0,4.3e-9zm-17.650922,10.133818l5.28100361,-19.6491396c0.0951532183,-0.285459655 0.380612873,-0.475766091 0.666072528,-0.380612873s0.475766091,0.380612873 0.380612873,0.666072528l-5.281004,19.601563c-0.0951532183,0.285459655 -0.380612873,0.475766091 -0.666072528,0.380612873c-0.28546,-0.047577 -0.428189,-0.333036 -0.380613,-0.618496l5.17e-7,7.2e-8zm-12.702954,-10.133818l9.800781,-8.611366c0.237883046,-0.190306436 0.57091931,-0.190306436 0.761225746,0.0475766092c0.237883046,0.237883046 0.237883046,0.618495919 -0.0475766091,0.808802355l-8.896826,7.754987c-0.237883046,0.237883046 -0.237883046,0.618495919 0,0.856378964l8.94440252,7.75498729c0.237883046,0.237883046 0.285459655,0.57091931 0.0475766092,0.808802355c-0.190306436,0.190306436 -0.57091931,0.237883046 -0.761225746,0.0475766091l-9.848358,-8.611366c-0.237883,-0.237883 -0.237883,-0.618496 0,-0.856379l4.799e-7,-1.823e-7z" },
    { name: 'k', path: "m89.411503864464,55.284840907654c0,-0.865247754 -0.288415918,-1.58628755 -0.793143774,-2.16311938l-13.988172,-17.1607471l13.2671322,-11.8250526c0.721039795,-0.576831836 1.15366367,-1.44207959 1.15366367,-2.4515353c0,-0.865247754 -0.360519897,-1.58628755 -0.937351733,-2.23522336c-0.648935815,-0.721039795 -1.44207959,-1.15366367 -2.4515353,-1.15366367c-0.865247754,0 -1.65839153,0.360519897 -2.23522336,0.937351733l-17.521267,15.6465635l0,-29.3463197c0,-1.00945571 -0.360519897,-1.87470347 -1.00945571,-2.52363928c-0.648935815,-0.648935815 -1.51418357,-1.00945571 -2.52363928,-1.00945571c-1.08155969,0 -1.94680745,0.360519897 -2.59574326,1.00945571c-0.648935815,0.648935815 -0.937351733,1.51418357 -0.937351733,2.52363928l0,49.247018c0,1.08155969 0.288415918,1.94680745 0.937351733,2.59574326c0.648935815,0.648935815 1.51418357,0.937351733 2.59574326,0.937351733c1.00945571,0 1.87470347,-0.288415918 2.52363928,-0.937351733c0.648935815,-0.648935815 1.00945571,-1.51418357 1.00945571,-2.59574326l0,-11.0319089l3.60519897,-3.1725751l13.6997561,16.9444352c0.648935815,0.865247754 1.51418357,1.29787163 2.59574326,1.29787163c0.793143774,0 1.58628755,-0.288415918 2.30732734,-0.865247754c0.865247754,-0.721039795 1.29787163,-1.58628755 1.29787163,-2.66784724l-3e-9,4.1e-8z" },
    { name: 'c', path: "m130.816833864464,25.073273907654c-3.74940693,-4.32623877 -8.50826958,-6.48935815 -14.13238,-6.48935815c-3.74940693,0 -7.13829397,0.865247754 -10.0945571,2.59574326c-3.02836714,1.73049551 -5.33569448,4.10992683 -6.99408601,7.13829397s-2.4515353,6.48935815 -2.4515353,10.3108691c0,3.74940693 0.793143774,7.21039795 2.52363928,10.2387651c1.73049551,3.02836714 4.10992683,5.40779846 7.13829397,7.13829397s6.41725417,2.59574326 10.2387651,2.59574326c5.19148652,0 9.51772529,-1.58628755 12.9787163,-4.83096663c0.576831836,-0.576831836 0.865247754,-1.22576765 0.865247754,-1.94680745c0,-0.937351733 -0.504727856,-1.80259949 -1.36997561,-2.59574326c-0.576831836,-0.432623877 -1.22576765,-0.648935815 -1.87470347,-0.648935815c-0.865247754,0 -1.80259949,0.360519897 -2.66784724,1.00945571c-2.01891143,1.73049551 -4.68675867,2.52363928 -7.93143774,2.52363928c-2.52363928,0 -4.75886265,-0.576831836 -6.70567009,-1.73049551c-1.94680745,-1.15366367 -3.46099102,-2.73995122 -4.54255071,-4.75886265s-1.58628755,-4.39834275 -1.58628755,-6.99408601c0,-4.03782285 1.15366367,-7.35460591 3.46099102,-9.80614121c2.30732734,-2.4515353 5.2635905,-3.74940693 9.01299744,-3.74940693c1.80259949,0 3.38888704,0.360519897 4.83096663,0.937351733s2.73995122,1.51418357 3.96571887,2.8120552c0.721039795,0.865247754 1.65839153,1.29787163 2.8120552,1.29787163c0.576831836,0 1.15366367,-0.144207959 1.65839153,-0.504727856c1.00945571,-0.721039795 1.58628755,-1.58628755 1.58628755,-2.66784724c0,-0.721039795 -0.288415918,-1.29787163 -0.721039795,-1.87470347l-2.9e-8,-3.2e-8z" },
    { name: 'o', path: "m173.591017864464,21.179658907654c-3.02836714,-1.73049551 -6.41725417,-2.59574326 -10.1666611,-2.59574326c-3.89361489,0 -7.28250193,0.865247754 -10.3108691,2.59574326c-3.02836714,1.73049551 -5.40779846,4.03782285 -7.06618999,7.06618999c-1.73049551,3.02836714 -2.52363928,6.48935815 -2.52363928,10.382973c0,3.89361489 0.793143774,7.28250193 2.52363928,10.3108691c1.65839153,3.02836714 4.03782285,5.40779846 7.06618999,7.13829397s6.41725417,2.52363928 10.3108691,2.52363928c3.82151091,0 7.21039795,-0.793143774 10.2387651,-2.52363928c3.02836714,-1.73049551 5.33569448,-4.10992683 7.06618999,-7.13829397c1.65839153,-3.02836714 2.52363928,-6.41725417 2.52363928,-10.3108691c0,-3.89361489 -0.865247754,-7.35460591 -2.59574326,-10.382973c-1.73049551,-3.02836714 -4.03782285,-5.33569448 -7.06618999,-7.06618999l-2e-8,0zm-16.8002272,5.6241104c1.94680745,-1.15366367 4.18203081,-1.73049551 6.63356611,-1.73049551s4.61465469,0.576831836 6.56146213,1.73049551c1.94680745,1.15366367 3.46099102,2.8120552 4.54255071,4.83096663c1.08155969,2.09101541 1.65839153,4.39834275 1.65839153,6.99408601s-0.576831836,4.97517458 -1.65839153,6.99408601s-2.59574326,3.60519897 -4.54255071,4.75886265c-1.94680745,1.15366367 -4.10992683,1.73049551 -6.56146213,1.73049551s-4.68675867,-0.576831836 -6.63356611,-1.73049551c-1.94680745,-1.15366367 -3.46099102,-2.73995122 -4.54255071,-4.75886265c-1.15366367,-2.01891143 -1.65839153,-4.39834275 -1.65839153,-6.99408601s0.504727856,-4.9030706 1.65839153,-6.99408601c1.08155969,-2.01891143 2.59574326,-3.67730295 4.54255071,-4.83096663z" },
    { name: 'd', path: "m195.182403864464,38.556717907654c0,3.82151091 0.865247754,7.21039795 2.59574326,10.2387651c1.73049551,3.02836714 4.18203081,5.47990244 7.21039795,7.21039795s6.41725417,2.59574326 10.0945571,2.59574326l16.3676034,0c1.00945571,0 1.80259949,-0.288415918 2.4515353,-0.937351733c0.721039795,-0.721039795 1.00945571,-1.51418357 1.00945571,-2.4515353l0,-49.5354338c0,-1.08155969 -0.288415918,-1.94680745 -1.00945571,-2.66784724c-0.648935815,-0.648935815 -1.51418357,-1.00945571 -2.66784724,-1.00945571c-1.00945571,0 -1.87470347,0.360519897 -2.59574326,1.00945571c-0.721039795,0.721039795 -1.08155969,1.58628755 -1.08155969,2.66784724l0,19.4680745c-1.65839153,-2.01891143 -3.67730295,-3.60519897 -6.12883826,-4.83096663c-2.37943132,-1.15366367 -4.97517458,-1.73049551 -7.78722978,-1.73049551c-3.46099102,0 -6.56146213,0.865247754 -9.37351733,2.59574326c-2.8120552,1.80259949 -5.04727856,4.18203081 -6.63356611,7.21039795s-2.4515353,6.48935815 -2.4515353,10.1666611l-4e-8,-1.47e-7zm7.06618999,0c0,-2.52363928 0.576831836,-4.83096663 1.73049551,-6.84987805c1.15366367,-2.01891143 2.66784724,-3.67730295 4.61465469,-4.83096663c1.94680745,-1.15366367 4.10992683,-1.80259949 6.48935815,-1.80259949c2.4515353,0 4.61465469,0.648935815 6.56146213,1.80259949c1.94680745,1.15366367 3.46099102,2.8120552 4.54255071,4.83096663c1.15366367,2.01891143 1.65839153,4.32623877 1.65839153,6.84987805c0,2.59574326 -0.504727856,4.9030706 -1.65839153,6.92198203c-1.08155969,2.09101541 -2.59574326,3.74940693 -4.54255071,4.9030706s-4.10992683,1.73049551 -6.56146213,1.73049551c-2.37943132,0 -4.54255071,-0.576831836 -6.48935815,-1.73049551c-1.94680745,-1.15366367 -3.46099102,-2.8120552 -4.61465469,-4.9030706c-1.15366367,-2.01891143 -1.73049551,-4.32623877 -1.73049551,-6.92198203z" },
    { name: 'e', path: "m285.441564864464,40.287212907654c0.576831836,-0.576831836 0.937351733,-1.36997561 0.937351733,-2.30732734c0,-3.74940693 -0.721039795,-7.13829397 -2.16311938,-10.0945571c-1.44207959,-2.88415918 -3.53309499,-5.19148652 -6.20094224,-6.84987805c-2.73995122,-1.58628755 -5.91252632,-2.4515353 -9.58982927,-2.4515353c-3.74940693,0 -7.13829397,0.865247754 -10.0945571,2.59574326c-2.95626316,1.73049551 -5.2635905,4.10992683 -6.92198203,7.13829397s-2.4515353,6.48935815 -2.4515353,10.3108691c0,3.89361489 0.865247754,7.28250193 2.59574326,10.3108691c1.73049551,3.02836714 4.18203081,5.40779846 7.35460591,7.13829397c3.10047112,1.73049551 6.63356611,2.52363928 10.599285,2.52363928c2.16311938,0 4.47044673,-0.360519897 6.92198203,-1.22576765c2.4515353,-0.793143774 4.47044673,-1.87470347 6.12883826,-3.1725751c0.721039795,-0.576831836 1.15366367,-1.29787163 1.15366367,-2.16311938c0,-0.865247754 -0.432623877,-1.73049551 -1.29787163,-2.4515353c-0.576831836,-0.432623877 -1.29787163,-0.721039795 -2.16311938,-0.721039795c-0.937351733,0 -1.73049551,0.288415918 -2.37943132,0.793143774c-1.00945571,0.793143774 -2.30732734,1.44207959 -3.89361489,1.94680745c-1.58628755,0.576831836 -3.02836714,0.793143774 -4.47044673,0.793143774c-3.67730295,0 -6.77777407,-1.00945571 -9.30141335,-3.10047112c-2.52363928,-2.01891143 -4.03782285,-4.75886265 -4.54255071,-8.14774968l27.3995122,0c0.937351733,0 1.73049551,-0.288415918 2.37943132,-0.865247754l-5.3e-8,-1.09e-7zm-25.5969127,-12.6181964c2.16311938,-1.87470347 5.04727856,-2.88415918 8.58037356,-2.88415918c3.1725751,0 5.69621438,1.00945571 7.7151258,2.88415918c1.94680745,1.94680745 3.1725751,4.54255071 3.60519897,7.7151258l-24.0106252,0c0.576831836,-3.1725751 1.94680745,-5.76831836 4.10992683,-7.7151258l4e-8,0z" },
    { name: 'd2', path: "m295.264229864464,38.556717907654c0,3.82151091 0.865247754,7.21039795 2.59574326,10.2387651c1.73049551,3.02836714 4.18203081,5.47990244 7.21039795,7.21039795s6.41725417,2.59574326 10.0945571,2.59574326l16.3676034,0c1.00945571,0 1.80259949,-0.288415918 2.4515353,-0.937351733c0.721039795,-0.721039795 1.00945571,-1.51418357 1.00945571,-2.4515353l0,-49.5354338c0,-1.08155969 -0.288415918,-1.94680745 -1.00945571,-2.66784724c-0.648935815,-0.648935815 -1.51418357,-1.00945571 -2.66784724,-1.00945571c-1.00945571,0 -1.87470347,0.360519897 -2.59574326,1.00945571c-0.721039795,0.721039795 -1.08155969,1.58628755 -1.08155969,2.66784724l0,19.4680745c-1.65839153,-2.01891143 -3.67730295,-3.60519897 -6.12883826,-4.83096663c-2.37943132,-1.15366367 -4.97517458,-1.73049551 -7.78722978,-1.73049551c-3.46099102,0 -6.56146213,0.865247754 -9.37351733,2.59574326c-2.8120552,1.80259949 -5.04727856,4.18203081 -6.63356611,7.21039795s-2.4515353,6.48935815 -2.4515353,10.1666611l-4e-8,-1.47e-7zm7.06618999,0c0,-2.52363928 0.576831836,-4.83096663 1.73049551,-6.84987805c1.15366367,-2.01891143 2.66784724,-3.67730295 4.61465469,-4.83096663c1.94680745,-1.15366367 4.10992683,-1.80259949 6.48935815,-1.80259949c2.4515353,0 4.61465469,0.648935815 6.56146213,1.80259949c1.94680745,1.15366367 3.46099102,2.8120552 4.54255071,4.83096663c1.15366367,2.01891143 1.65839153,4.32623877 1.65839153,6.84987805c0,2.59574326 -0.504727856,4.9030706 -1.65839153,6.92198203c-1.08155969,2.09101541 -2.59574326,3.74940693 -4.54255071,4.9030706s-4.10992683,1.73049551 -6.56146213,1.73049551c-2.37943132,0 -4.54255071,-0.576831836 -6.48935815,-1.73049551c-1.94680745,-1.15366367 -3.46099102,-2.8120552 -4.61465469,-4.9030706c-1.15366367,-2.01891143 -1.73049551,-4.32623877 -1.73049551,-6.92198203z" },
  ];
  
  PATHS.forEach((path, index) => {
    path.svg = paper.path("");

    path.svg.attr({
      id: path.name
    });

    path.stepAnimation =(step) => {
      path.svg.attr({ 
        path: Snap.path.getSubpath(path.path, 0, step)
      });
    }

    path.animationCallback =() => {
      path.svg.addClass('kaboom');

      try {
        // attempt to animate next Element
        const next = PATHS[index + 1];

        Snap.animate(0, 
          Snap.path.getTotalLength(next.path), 
          next.stepAnimation, 
          288, 
          mina.easeinout, 
          next.animationCallback);

      } catch(e) {
        // default callback action
        setTimeout(()=>{
          $('#tagline').addClass('show');
        }, 300);
      }
    }
  });
  
  const group = paper.g();
  group.add( PATHS.map(p=> p.svg) );

  group.attr({
    preserveAspectRatio: "xMidYMid meet"
  });
  
  setTimeout(() => {
    const first = PATHS[0];
  
    Snap.animate(0, 
      Snap.path.getTotalLength(first.path), 
      first.stepAnimation, 
      888, 
      mina.easeinout, 
      first.animationCallback);

  }, 888);
  

}
