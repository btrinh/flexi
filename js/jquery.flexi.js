;(function ($, window, document, undefined) {
	var Flexi = function (el, options) {
		this.el = el;
		this.$el = $(el);
		this.$children = this.$el.children();
		this.$wrapper = '';
		this.$flexy = '';
		
		this.runStatus = 'resumed';
		this.currentStep = 0;
		this.nVisible = 1;
		
		this.nChildren = this.$children.size();
		this.childWidth = 0;
		
		this.options = options;
		this.metadata = this.$el.data('plugin-options');
		
		this._bind = function (fn, self) {
			return function (){
				return fn.apply(self, arguments)
			}
		}
	}

	Flexi.prototype = {
		defaults: {
			step: 1,                      // number of slides to advance per rotation
			speed: 300,                   // rotation speed
			nav: true,                    // hide/show navigation buttons
			auto: true,                   // advance the carousel automatically
			interval: 5000,               // time between rotations
      visible: null                 // defaults to calculated max value
		},
		
		init: function(){
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			
			// DOM templates
			var arrowLeft = ['<a class="flexi-prev" style="',
													'width: 32px;',
													'height: 25px;',
													'position: absolute;',
													'background-image: url(&quot;img/arrow-left.png&quot;);',
											'"></a>'].join('');
											
			var arrowRight = ['<a class="flexi-next" style="',
													'width: 32px;',
													'height: 25px;',
													'position: absolute;',
													'background-image: url(&quot;img/arrow-right.png&quot;);',
											'"></a>'].join('');
											
			// init DOM configuration
			this.$flexi = this.$el.wrap('<div class="flexi" />').parent();
			this.$wrapper = this.$flexi.wrap('<div class="flexi-wrapper" />').parent();
			if (this.config.nav) {
				this.$wrapper
							.prepend(arrowLeft)
							.prepend(arrowRight);
			}
		
			// initalize css
			this.$el.css({
					width: 9000,
					position: 'relative',
				});
			
			this.$flexi.css({
					position: 'relative',
					overflow: 'hidden',
				});
			
			this.$children.css({ float: 'left'});
			
			this.$wrapper.css({
					position: 'relative',
				});
				
			// init DOM values
			this.$navLeft = this.$wrapper.children('a.flexi-prev');
			this.$navRight = this.$wrapper.children('a.flexi-next');
			this._updateProp();
			
			// assuming both nav buttons are same size
			var navWidth = this.$navLeft.width(),
					navHeight = this.$navLeft.height();

			// flexi options
			if (this.config.nav) {
				this.$flexi.css({ marginLeft: '70px', marginRight: '70px' });
				
				var marginLeft = parseInt( this.$flexi.css('marginLeft') ),
						marginRight =  parseInt( this.$flexi.css('marginRight') );

				this.$navLeft.css({ 
						top: (this.wrapperOuterHeight - navHeight)/2 + 'px',
						left: (this.wrapperPaddingLeft + marginLeft - navWidth)/2 + 'px'
					});
				this.$navRight.css({ 
						top: (this.wrapperOuterHeight - navHeight)/2 + 'px',
						right: (this.wrapperPaddingRight + marginRight - navWidth)/2 + 'px'
					});
				
				this._updateProp();
			}
			
			
			this.nVisible = this.config.visible || 
        Math.floor( (this.$flexi.width()/this.childWidth ));
      
      this._updateProp();
			
			// adjust item padding									
			this.$children.css({ 
					paddingLeft: this.padAdjustment, 
					paddingRight: this.padAdjustment
				});
			this._updateProp();
			
			// settings
			this.events();
			
			if (this.config.auto) this.autoRotate();

			return this;
		},
	
		autoRotate: function(){
			window.setInterval(this._bind(function(){
				if (this.runStatus == 'paused') window.clearInterval
				else {
					this.next();
				}
			}, this), this.config.interval);
		},
		
		// event bindings
		events: function(){
			// pause on mouse over, resume when not hovering
			this.$flexi.bind({
				mouseenter: this._bind(function(){
					this.runStatus = 'paused';
				}, this),
				mouseleave: this._bind(function(){
					this.runStatus = 'resumed';
				}, this)
			});
			
			// window resize event
			// to do...
			
			// nav button event
			this.$navRight.click( this._bind(this.next, this) );
			this.$navLeft.click( this._bind(this.prev, this) );
		},
		
		prev: function() {
			this.currentStep = (this.currentStep - this.config.step < 0)
											 ? this.nChildren - this.nVisible
											 : this.currentStep - this.config.step;
			
			this.$el
				.stop()
				.animate({ left: -(this.childWidth * this.currentStep) },
																							this.config.speed,
																							null);
		},
		
		next: function() {
			this.currentStep = 
				(this.currentStep + this.config.step > this.nChildren - this.nVisible)
				?	0
				: this.currentStep + this.config.step;
				
			this.$el
					.stop()
					.animate({ left: -(this.childWidth * this.currentStep) }, this.config.speed, null);
		},
		
		// update plugin property values, due to css/window changes
		_updateProp: function(){
			this.wrapperOuterHeight = this.$wrapper.outerHeight();
			this.wrapperPaddingLeft = parseInt( this.$wrapper.css('paddingLeft') );
			this.wrapperPaddingRight = parseInt( this.$wrapper.css('paddingRight') );
			this.childWidth = this.$children.eq(0).outerWidth();
			var flexiWidth = this.$flexi.innerWidth();
			this.padAdjustment = (flexiWidth- this.childWidth * this.nVisible)
													/ (this.nVisible * 2);
		}
	},
		
	Flexi.defaults = Flexi.prototype.defaults;
	
	$.fn.flexi = function (options) {
		return this.each(function(){
			new Flexi(this, options).init();
		});
	}
		
})(jQuery, window, document);
