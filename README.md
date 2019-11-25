# [Toy](https://slugbyte.github.io/toy)

![](https://assets.slugbyte.com/github/misc/toy-header-b.png)

## About
Toy is a micro virtual-machine that I built to have a better undstanding of assemblers. It has a fun GUI for inspecting the interworkings of the VM's registers and memory, as well as an interpriter for testing assembly instructions and a decimal-to-hex converter. 

## Using Toy
![](https://assets.slugbyte.com/github/misc/toy-header-a.png)
* `Run` will start the VM's clock.
* `Pause` will stop the VM's clock.
* `Debug` will slow the VM's clock, and highlight the current instrucion in memory.
* `>` will execute the next instruction in memory.
* `Reset` will stop the clock and clear the registers (aka. let you start the program from the begging).
* `Format` will clear the memory of the program.
* `Assemble` will assemble the code in the editor and load it into the VM's memory.

## Instruction Set
Everything is case sensitve.

* A registers can be refrenced with is's name `A`, `B`, `C`, `D`, `Z`, `S`
* Hex constants are written `fa`,  `13`, `0`, or `a`
* Memory Address are written hex with a preceding x `x00`, `x80`, or `xf2` 

### NOP
Usage: `NOP`

NOP is used to do pause the program for one clock cycle

### MOV
Usage: `MOV Source Destination`

MOV is used to move a value from a source into a destination
### ADD
Usage: `ADD Source Destination`

ADD will compute the sum of the `source` and `destination` and store the result in the `desitnation`.
### SUB
Usage: `SUB Source Destination`

ADD will subtract the `source` from the `destination` and store the result in the `desitnation`.

### MOD
Usage: `MOD Source Destination`

MOD will calulate the remainder of the `source` divided  by the `destination` and store the result in the destination.

### SL
Usage: `SL Source Destination`

SL will bitwise shift the `destination` `source` places to the left and store the result in the destination.

### SR
Usage: `SR Source Destination`

SR will bitwise shift the `destination` `source` places to the right and store the result in the destination.

### AND
Usage: `AND Source Destination`

AND will compute the bitwise and of the `source` and `destination` and store the result in the `destination`.

### XOR
Usage: `XOR Source Destination`

XOR will compute the bitwise-exclusive-or of the `source` and `destination` and store the result in the `destination`.

### OR
Usage: `OR Source Destination`

OR will compute the bitwise-or of the `source` and `destination` and store the result in the `destination`.

### JMP
Usage: `JMP Destination`

JMP will set the program counter to the address of the `destination`.

### JEQ
Usage: `JEQ Arg1 Arg2 Destination`

JEQ will set the program counter to the address of the `destination` if Arg1 and Arg2 are equal.

### JLT
Usage: `JLT Arg1 Arg2 Destination`

JLT  will set the program counter to the address of the `destination` if Arg1 is less than Arg2.
### JGT
Usage: `JGT Arg1 Arg2 Destination`

JGT  will set the program counter to the address of the `destination` if Arg1 is grater than Arg2.

### HALT
Usage: `HALT Source Destination`

HALT will stop the clock.
### LOG
Usage: `LOG Source`

LOG is will console log a value.
### RANDW
Usage: `RANDW  Destination`

RANDW will genorate and store a random WORD into `destination`.
### RANDB
Usage: `RANDB  Destination`

RANDB will genorate and store a random Byte into `destination`.
### IN
Usage: `IN Pin Destination`

IN will load a O or 1 from a PIN into a `destination`
### OUT
Usage: `OUT Source Pin`

Out will set a PIN to 0 or 1 from a source.
