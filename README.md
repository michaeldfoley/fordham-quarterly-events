# Email Base

This is a responsive starter email template that works across the major browsers/clients/devices. The template is based off of Nicole Merlin's [Creating a Future-Proof Responsive Email Without Media Queries](http://webdesign.tutsplus.com/tutorials/creating-a-future-proof-responsive-email-without-media-queries--cms-23919). The workflow is based off of Marco Solazzi's [Grunt Email Boilerplate](https://github.com/dwightjack/grunt-email-boilerplate).

## Features

* SCSS stylesheets with [Compass](http://compass-style.org/)
* Image optimization with [jpegtran](http://jpegclub.org/jpegtran/) and [OptiPNG](http://optipng.sourceforge.net/)
* Inlining CSS styles with [grunt-premailer](https://github.com/dwightjack/grunt-premailer) and [Premailer](http://premailer.dialect.ca/)
* Test email delivery with [grunt-nodemailer](https://github.com/dwightjack/grunt-nodemailer) and [NodeMailer](https://github.com/andris9/Nodemailer)

##Requirements

* Node.js >= 0.8.0 ([install wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager))
* Grunt-cli >= 0.1.7 and Grunt >=0.4.2 (`npm install grunt-cli -g`)
* Ruby >= 1.9.3 ([installers](http://www.ruby-lang.org/en/downloads/))
* Compass >= 0.12.2 (`gem install compass`)
* Premailer >= 1.8.0 (`gem install premailer` and, most of the time, `gem install hpricot`)

## Getting Started

1. install all required dependencies (see above)

2. clone this git repo

	`git clone git://github.com/michaeldfoley/email-base.git`

3. install node dependencies:
	
	`cd email-base`

	`npm install`

4. Run the server task `grunt serve` and start editing email files in `app` folder.

## Documentation

###Sources

This template comes with a customized version of the [Future-Proof Responsive Email](https://github.com/tutsplus/creating-a-future-proof-responsive-email-without-media-queries).

Sources are located in the `app` folder:

* `index.html`: HTML Template
* `scss/`: SCSS folder
	* `_variables.scss`: style variables
	* `_reset.scss`: reset
	* `_scaffolding.scss`: base styles
	* `_grid.scss`: the 1-column, 2-column, and 3-column layouts as well as a sidebar layout
	* `_type.scss`: typographic styles
	* `style.scss`: glue stylesheet, add the additional partials you create here
* `img`: source images of your email
* `css`: generated css from scss files. Don't edit this directly

###Default Tasks

**`serve` Tasks**

This tasks runs a watch trigger for changes to sources inside the `app` folder and starts a static HTTP server at `http://localhost:8000`

NOTE: This tasks doesn't apply any style inlining.

**`serve:dist` Tasks**

Runs the build task and starts a static HTTP server that points to the `dist` folder.

**`build` Tasks**

This tasks creates a build from your sources. It creates a folder named `dist`, then compiles your SCSSes and inlines the resulting stylesheet in the HTML source through Premailer. By default, Premailer outputs a text version too. 

Images are optimized with jpegtran and OptiPNG.

**`send` Tasks**

Runs the `build` task and sends the compiled email to the recipient specified in the prompts. Default recipient(s) can be specified in `Gruntfile.js`.

## Support

Tested and working in the following email clients:

### Desktop Clients

* Apple Mail: 7, 8
* Live Mail
* Lotus Notes: 8, 8.5
* Outlook: 2003, 2007, 2010, 2011, 2013
* Thunderbird

### Mobile

* Android: 4.4.4
* Android Gmail
* Gmail App iOS 7
* iPad: 2, Mini
* iPhone: 5S (iOS 7, 8), 6 (iOS 8), 6+ (iOS 8)

### Webmail

* AOL: Chrome (mac/win), Firefox (mac/win), IE 9, IE 10, IE 11, Safari (mac)
* BOL: Chrome (win)
* Comcast: Chrome (win), Firefox (win)
* GMX: Firefox (mac)
* Gmail: Chrome (mac/win), Firefox (mac/win), IE 9, IE 10, IE 11, Safari (mac)
* Office 365: Chrome (win), Firefox (win), IE 9, IE 10, IE 11
* Outlook.com: Chrome (mac/win), Firefox (mac/win), IE 9, IE 10, IE 11, Safari (mac)
* Yahoo!: Chrome (mac/win), Firefox (mac/win), IE 9, IE 10, IE 11