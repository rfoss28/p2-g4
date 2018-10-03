# UNH Bootcamp Project 2 - Group 4
(John K, Ryan, Jake P)

## Codename: RxCheck


- Jake P git test   #1
- John Kerr git test #4
- Ryan Foss git test #1

# NOTE: THIS IS JUST A MOCK DESIGN TO GET SOME BASIC FUNCTIONALITY WORKING, WILL IMPROVE. 

## JAKE - mock - design push
in this push, I have added a start page,that displays our current disclaimer. The user has to click check box to go any further.
the check box causes a button to appear, and when this button is clicked a modal is popped that stuf to sign in. (passport.js not or input sanitization done), then when the submit credintials button is clicked you're brought to the original "index.handlebars" page. Here is where you can add up to 5 medications. 

# Changes to html routes

to enable a start page, I had to change the "/" route, so that it sends the user to the start.handlebars page, I then changed the index route to "/index". 

# Other changes
added neccisary jQuery code to index.js, primarily the event listener that allows / limits the user to adding more medications

added authenticate.js which is the javascript file that is used for the start.handlebars page
right now this file has the event listener, to show the login button as long as the checkbox has been "checked"
