### preset
```
{
	metadata: METADATA,
	modules: Array[MODULE],
	connections: Array[CONNECTION]
}
```
### metadata
```
{
	id: ID
	name: string,
	pos: POSITION,
	owner: USER_ID,
	public: bool, # everybody who has the preset_id can edit it
	date_of_creation: DATE,
	date_of_last_modification: DATE
}
```
### position
```
{
	x: int
	y: int
}
```
### module
```
{
	id: ID,
	type: TYPE,
	pos: POSITION, # relative to the position of the preset
	inputs: Array[PORT],
	outputs: Array[PORT]
	parameters: json string
}
```
### port
```
{
	id: ID,
	name: string,
	pos: POSITION # relative to the position of the module
}
```
### connection
```
{
	fromModule: ID,
	toModule: ID,
	fromPort: ID,
	toPort: ID,
	color: COLOR
}
```
### types
```
{
	BasicOsc,
	VCA,
	VCF,
	AudioInput,
	AudioOutput,
	ADSR,
	Mixer,
	Delay,
	Reverb,
	Theremin,
	MidiInput
}
```