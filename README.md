# What is it?

A small map built using React and Leaflet that displays a map of Savage Wilds

# Help me gather data!

I don't know all the spots myself, and I would appreciate filling in the gaps.

I will require at least the following:
* A TeleportPlayer command

You can open an issue here with your teleports or leave me a DM on discord.

If you are familiar with git and GitHub, you may just edit the ``data.json`` in ``public`` yourself and open a pull request.

## Adding Data Entries
### Data Storage
Data is not stored in any backend. Instead, it's committed to the repository as part of the application. You can
find all data that is displayed on this map in ``public/data.json``. **Do not edit anything in docs, as this is deployed and overwritten**

### Structure
You can also find the structure of the ``data.json`` as typescript mapping in the ``MapData`` interface. If you are not familiar
with Typescript, here is a description:
**MapData**
- **map_lq** is the relative location of the low quality map (relative to /public)
- **map_hq** is the relative location of the low quality map (relative to /public)
- **bounds** Are the map bounds of the map. You can safely ignore this.
- **minZoom/maxZoom** Are leaflet zoom settings
- **contributors** are people that wanted to be mentioned for contributing, they will be displayed in the info box
- **data** is an array of **MapLocationGroup**

**MapLocationGroup**

See [MapLocationGroup.ts](src%2Fmodel%2FMapLocationGroup.ts)

- **id** must be a unique identifier and can be an arbitrary string
- **name** is the display name of that group, e.g. "Resources" or "Dungeons"
- **type** is used to resolve the icon. You will need to take a look at ``LocationGroupType`` in [MapLocationGroup.ts](src%2Fmodel%2FMapLocationGroup.ts) to see what is available
- **funcomId** can be safely ignored, it's an optional funcom ID that can be used to spawn the desired item/thrall/etc
- **locationDescription** is also legacy and can be ignored.
- **locations** is an array of **MapLocation**

**MapLocation**

See [MapLocation.ts](src%2Fmodel%2FMapLocation.ts)

This is the actual location on the map. Everything up till now was just meta data and grouping. 

- **location** Is the name of the thing you are trying to display, e.g. "Silverstone" or "Darfari Weapons"
- **spawnSpot** The map location (searchable and ideally a map marker) - e.g. "The Grove", "The Wellspring" or "Murun"
- **spawnSpotDetail** Is a description on where to find the thing you are trying to display, e.g. "A book on a bench next to the forge"
- **type** is again used for the icon, see [MapLocationGroup.ts](src%2Fmodel%2FMapLocationGroup.ts)
- **source** is meta information for people working on the map, usually just a TeleportToPlayer
- **x, y and z** are the x, y and z coordinate of TeleportToPlayer, where the first is x, the second is y and the third is z


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
9. Now commit your changes to the workflow file. If everything is set up properly, GH Actions will build the single page app and then deploy it to GH pages


## Deploying
Deployment is done with GH Pages and GH Actions.

When pushing to main, GH Actions will 
1. remove the old ``docs`` folder
2. Do a CI build of the app
3. move ``build`` to ``docs``
4. commit and push the new ``docs`` folder

Which will then get picked up by GH pages and deployed.
