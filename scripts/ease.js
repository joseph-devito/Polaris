/**
 * Author: Levi
 * Created: 10/5/13
 */
(function($) {
    $(document).ready(function() {
        app.registerForEvents(this, {
            onActionEasePreview: updatePreview,
            editor_ActionSelected: updatePreview
        });

        var interval = null;
        function updatePreview() {
            var display = $("#actionEasePreview:visible");
            if (display.length == 0)
                return;
            display.empty();
            var xdot = $('<div class="xdot"></div>');
            var ydot = $('<div class="ydot"></div>');
            var type = $('select[name="actionEaseType"]').val();
            var inOut = $('select[name="actionEaseInOut"]').val();
            var easeFn = Ease[type+inOut];
            if (interval)
                clearInterval(interval);
            if (!easeFn)
                return;

            var width = display.width()-2;
            var height = display.height()-2;
            var t = 0;
            var duration = .75;
            interval = setInterval(function() {
                if (t >= duration || t < 0) {
                    clearInterval(interval);
                    interval = null;
                    t = duration;
                }
                var x = Ease.linear(t, 0, width, duration);
                var y = easeFn(t, 0, height, duration);
                var y2 = easeFn(t, 0, height-2, duration)-1;
                display.append(xdot.clone().css({bottom:y, left:x}));
                display.append(ydot.clone().css({bottom:y2, left:width/2}));
                t += 1/(width/2) / duration;
            }, 1000/(width/2));
        }
//        updatePreview();

        var lastType, lastInOut;
        setInterval(function() {
            var type = $('select[name="actionEaseType"]').val();
            var inOut = $('select[name="actionEaseInOut"]').val();
            if (type != lastType || inOut != lastInOut) {
                updatePreview();
                lastType = type;
                lastInOut = inOut;
            }
        }, 1000/15);
    });

    window.Ease = {
        linear: function(t, b, c, d) {
            return c*t/d + b;
        },
        linearCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.linear(t, b, c, d2);
            } else {
                return Ease.linear(d-t, b, c, d2);
            }
        },
        quadIn: function(t, b, c, d) {
            t /= d;
            return c*t*t + b;
        },
        quadOut: function(t, b, c, d) {
            t /= d;
            return -c * t*(t-2) + b;
        },
        quadInOut: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        },
        quadCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.quadInOut(t, b, c, d2);
            } else {
                return Ease.quadInOut(d-t, b, c, d2);
            }
        },
        cubicIn: function(t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        },
        cubicOut: function(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        },
        cubicInOut: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        },
        cubicCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.cubicInOut(t, b, c, d2);
            } else {
                return Ease.cubicInOut(d-t, b, c, d2);
            }
        },
        quarticIn: function(t, b, c, d) {
            t /= d;
            return c*t*t*t*t + b;
        },
        quarticOut: function(t, b, c, d) {
            t /= d;
            t--;
            return -c * (t*t*t*t - 1) + b;
        },
        quarticInOut: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t + b;
            t -= 2;
            return -c/2 * (t*t*t*t - 2) + b;
        },
        quarticCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.quarticInOut(t, b, c, d2);
            } else {
                return Ease.quarticInOut(d-t, b, c, d2);
            }
        },
        quinticIn: function(t, b, c, d) {
            t /= d;
            return c*t*t*t*t*t + b;
        },
        quinticOut: function(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t*t*t + 1) + b;
        },
        quinticInOut: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t*t*t + 2) + b;
        },
        quinticCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.quinticInOut(t, b, c, d2);
            } else {
                return Ease.quinticInOut(d-t, b, c, d2);
            }
        },
        sineIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        sineOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        sineInOut: function(t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        sineCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.sineInOut(t, b, c, d2);
            } else {
                return Ease.sineInOut(d-t, b, c, d2);
            }
        },
        exponentialIn: function(t, b, c, d) {
            return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
        },
        exponentialOut: function(t, b, c, d) {
            return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
        },
        exponentialInOut: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
            t--;
            return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
        },
        exponentialCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.exponentialInOut(t, b, c, d2);
            } else {
                return Ease.exponentialInOut(d-t, b, c, d2);
            }
        },
        circularIn: function(t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t*t) - 1) + b;
        },
        circularOut: function(t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t*t) + b;
        },
        circularInOut: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            t -= 2;
            return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
        },
        circularCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.circularInOut(t, b, c, d2);
            } else {
                return Ease.circularInOut(d-t, b, c, d2);
            }
        },
        elasticIn: function(t, b, c, d, a, p) {
            if (t==0) return b;
            if ((t/=d)==1) return b+c;
            if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) {
                a=c; var s=p/4;
            }
            else
                var s = p/(2*Math.PI) * Math.asin (c/a);

            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        elasticInOut: function(t, b, c, d, a, p) {
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) var p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) {var a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        elasticCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.elasticInOut(t, b, c, d2);
            } else {
                return Ease.elasticInOut(d-t, b, c, d2);
            }
        },
        elastic2In: function(t, b, c, d) {
            if (t==0) return b;
            if ((t/=d)==1) return b+c;
            var p=d*.3;
            var a=c;
            var s=p/4;

            return -(a*Math.pow(2,7*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elastic2Out: function(t, b, c, d) {
            if (t==0) return b;  if ((t/=d)==1) return b+c;  var p=d*.3;
            var a=c; var s=p/4;
            return (a*Math.pow(2,-7*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        elastic2InOut: function(t, b, c, d) {
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  var p=d*(.3*1.5);
            var a=c; var s=p/4;
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        elastic2Cycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.elastic2InOut(t, b, c, d2);
            } else {
                return Ease.elastic2InOut(d-t, b, c, d2);
            }
        },
        bounceIn: function(t, b, c, d) {
            return c - window.Ease.bounceOut (d-t, 0, c, d) + b;
        },
        bounceOut: function(t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        bounceInOut: function(t, b, c, d) {
            if (t < d/2) return window.Ease.bounceIn (t*2, 0, c, d) * .5 + b;
            else return window.Ease.bounceOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
        },
        bounceCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.bounceInOut(t, b, c, d2);
            } else {
                return Ease.bounceInOut(d-t, b, c, d2);
            }
        },
        backIn: function(t, b, c, d) {
            if (s == undefined) var s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d) {
            if (s == undefined) var s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        backInOut: function(t, b, c, d) {
            if (s == undefined) var s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;

        },
        backCycle: function(t, b, c, d) {
            var d2 = d*.5;
            if (t<d2) {
                return Ease.backInOut(t, b, c, d2);
            } else {
                return Ease.backInOut(d-t, b, c, d2);
            }
        }
    };
    window.Ease.linearIn = window.Ease.linear;
    window.Ease.linearOut = window.Ease.linear;
    window.Ease.linearInOut = window.Ease.linear;

})(jQuery);