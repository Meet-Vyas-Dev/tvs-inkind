/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);

// Smooth Scroll to Anchor (adjusted for spacing)
document.querySelectorAll('.toc-list a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 100; // <- adjust this based on your layout
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// // Collapsible TOC Toggle
//     const tocToggle = document.getElementById('tocToggle');
//     const tocList = document.getElementById('tocList');

//     tocToggle.addEventListener('click', () => {
//       tocList.classList.toggle('collapsed');
//       tocToggle.classList.toggle('collapsed');
//     });

const tocToggle = document.getElementById('tocToggle');
const tocList = document.getElementById('tocList');
const tocSymbol = document.getElementById('tocSymbol');

tocToggle.addEventListener('click', () => {
  const isCollapsed = tocList.classList.toggle('collapsed');
  tocToggle.classList.toggle('collapsed');
  tocSymbol.textContent = isCollapsed ? '+' : '–';
});


// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const themeLabel = document.querySelector('.theme-switch');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeLabel.classList.add('dark-mode');
            darkModeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeLabel.classList.remove('dark-mode');
            darkModeToggle.checked = false;
        }
    }

    // Initialize theme
    applyTheme(currentTheme);

    // Toggle theme when checkbox is clicked
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to dark mode
            body.classList.add('dark-mode');
            themeLabel.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            body.classList.remove('dark-mode');
            themeLabel.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Optional: Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Only apply system preference if no user preference is saved
    if (!localStorage.getItem('theme')) {
        if (mediaQuery.matches) {
            applyTheme('dark');
        }
    }

    // Optional: Listen for system theme changes in real-time
    mediaQuery.addEventListener('change', function(e) {
        // Only apply system preference if no user preference is saved
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});

function toggleDescription(id) {
	const content = document.getElementById(id);
	const header = content.previousElementSibling;
	content.classList.toggle('expanded');
	header.classList.toggle('expanded');
}

document.getElementById("year").textContent = new Date().getFullYear();