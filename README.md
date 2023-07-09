# What is it?

A small map built using React and Leaflet that displays a map of Savage Wilds

# Help me gather data!

I don't know all the spots myself, and I would appreciate filling in the gaps.

I will require at least the following:
* A TeleportPlayer command

You can open an issue here with your teleports or leave me a DM on discord.

If you are familiar with git and GitHub, you may just edit the ``data.json`` in ``public`` yourself and open a pull request.

# Run it
Want to run it locally? It runs without any backend, and is hosted on GH pages. Simply install git and NodeJS (and the bundled npm)
and run these in your command line:

1. ``git clone https://github.com/Nia292/savage-wilds-map.git``
2. ``cd savage-wilds-map``
3. ``npm install``
4. ``npm start``

Then open your browser on ``http://localhost:3000``

# Forking and hosting your own
You are free to fork this repository and host your own map. In fact, I encourage you to do so. It's completely free as 
long as you stay open source.

Hosting is provided through GitHub pages. Data is stored in the repository itself, so no backend is needed.

You will need:
* A GitHub account
* A bit of basic knowledge about git

Here is what you need to do:
1. Fork this repository (D'uh)
2. Head over to the ``.github/workflows/main.yml`` workflow and change the ``email`` and ``name`` properties in the last step to your own
3. Head over to GitHub's web page, open your repository, go into the settings and make the following changes:
   4. Under Actions -> General -> Workflow permissions, set the permissions to "read and write permissions"
   5. Under Pages -> Build and Deployment, make sure the following settings are set:
      6. Source: Deploy from a branch
      7. Branch: main
      8. Folder: /docs
4. Now commit your changes to the workflow file. If everything is set up properly, GH Actions will build the single page app and then deploy it to GH pages


## Deploying
Deployment is done with GH Pages and GH Actions.

When pushing to main, GH Actions will 
1. remove the old ``docs`` folder
2. Do a CI build of the app
3. move ``build`` to ``docs``
4. commit and push the new ``docs`` folder

Which will then get picked up by GH pages and deployed.
