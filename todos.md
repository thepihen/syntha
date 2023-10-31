Main priorities for now:
* make port position update when moving module to make connection move aswell
* logic for ports and modules
* make module implementation more generic so that each module can "fill in the blanks" with its content
* make a connections array (each connection being something like [from, to, fromPortId, toPortId])
* keep track of connections and order of elements with a tree like structure
* IN and OUT modules
* initialise the module position as createdCoords prop
* save connections in the correct way. Find a way to give them each its own color and the correct portIds