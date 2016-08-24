/**
	nebCountdown v1.0.0
    https://github.com/maxetime/nebCountdown

    Copyright 2016 Maxime Myers
    Released under the MIT license

    Markup attributes
        data-enddate : Set the end date for the countdown. Add to the element where the plugin is applied.
        data-format : Set the format for the current element has to be the element or a children. The innerhtml while be replaced.

    Options
        interval : The interval to update in milliseconds
        debug : Output debug messages to console

    Formats
        d : days
        dd : days with leading zero
        h : hours
        hh : hours with leading zero
        m : minutes
        mm : minutes with leading zero
        s : seconds
        ss : seconds with leading zero
        u : milliseconds
        uu : milliseconds with leading zero
**/

(function($){
	$.nebCountdown = function(element, options) {
		var defaults = {
			interval : 60000,
            afterTick : false
		};

		var plugin = this;

		plugin.options = {};
		plugin.data = {};
		plugin.animating = false;

		plugin.target = $(element);

        // Utility function to append a 0 to single-digit numbers
        plugin.lz = function(x){
            return (x < 0 || x > 9 ? "" : "0") + x;
        };

        plugin.isDate = function(d){
            return Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime());
        };

		plugin.generateView = function(){
			if(plugin.options.debug){ console.log('Generating View'); }
            var format = plugin.target.data('format');
            if(format){
                plugin.generateHtml(plugin.target);
            }else{
                plugin.target.find('[data-format]').each(function(){
                    plugin.generateHtml($(this));
                });
            }
		};

        plugin.generateHtml = function(el){
            format = el.data('format');
            el.html(plugin.diffFormat(plugin.data.diff,format));
        };

        plugin.diffFormat = function (diff,format) {
            var result = "",
                i_format = 0,
                _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;
            format = format + "";

            var value = {};
            value.d = Math.floor(diff / _day);
            value.h = Math.floor((diff % _day) / _hour);
            value.m = Math.floor((diff % _hour) / _minute);
            value.s = Math.floor((diff % _minute) / _second);
            value.u = diff % _second;

            value.dd = plugin.lz(value.d);
            value.hh = plugin.lz(value.h);
            value.mm = plugin.lz(value.m);
            value.ss = plugin.lz(value.s);
            value.uu = plugin.lz(value.u);
            while (i_format < format.length) {
                var c = format.charAt(i_format);
                var token = "";
                while ((format.charAt(i_format) == c) && (i_format < format.length)) {
                    token += format.charAt(i_format++);
                }
                result += typeof (value[token]) != "undefined" ? value[token] : token;
            }
            return result;
        };

		plugin.callFunction = function(options,val){
			if(typeof plugin[options] === 'function'){
				return plugin[options](val);
			}
		};

        plugin.tick = function(){
            if(plugin.options.debug){ console.log('Tick'); }
            var now = new Date();
            plugin.data.diff = Math.abs(plugin.data.enddate-now);
            if(plugin.options.debug){ console.log('Diff',plugin.data.diff); }
            plugin.generateView();
            if(typeof plugin.options.afterTick == 'function'){ plugin.options.afterTick(plugin.data.enddate-now,plugin.data.enddate); }
            setTimeout(plugin.tick,plugin.options.interval);
        };

        plugin.updateEndDate = function(){
            var t = plugin.target.attr('data-enddate').split(/[- :]/);
			plugin.data.enddate = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
        };

		plugin.init = function() {
			plugin.options = $.extend({}, defaults, options);
            if(plugin.options.debug){ console.log('Init'); }
            if(plugin.options.debug){ console.log('Options',plugin.options); }
            plugin.updateEndDate();
            if(plugin.options.debug){ console.log('Data',plugin.data); }
            if(plugin.isDate(plugin.data.enddate)){
                plugin.tick();
            } else if(plugin.options.debug) {
                console.log('Invalid date');
            }
		};

		plugin.init();
	};

	$.fn.nebCountdown = function(options,val) {
		return this.each(function(){
			if(undefined === $(this).data('nebCountdown')) {
				if(typeof options != 'undefined' && typeof options != 'object')
					return;
				var plugin = new $.nebCountdown(this, options);
				$(this).data('nebCountdown',plugin);
			} else {
				return $(this).data('nebCountdown').callFunction(options,val);
			}
		});
	};
})(jQuery);
