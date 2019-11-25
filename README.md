# [Toy](https://slugbyte.github.io/to)
![](https://assets.slugbyte.com/github/misc/toy-header-a.png)
![](https://assets.slugbyte.com/github/misc/toy-header-b.png)

## About
Toy is a micro virtual-machine that I built to have a better undstanding of assemblers. It has a fun GUI for inspecting the interworkings of the VM's registers and memory, as well as an interpriter for testing assembly instructions and a decimal-to-hex converter. 

## Instruction Set
## NOP
Usage: `NOP`

NOP is used to do pause the program for one clock cycle

## MOV
Usage: `MOV Source Destination`

MOV is used to move a value from a source into a destination
## ADD
Usage: `ADD Source Destination`

ADD will compute the sum of the `source` and `destination` and store the result in the `desitnation`.
## SUB
Usage: `SUB Source Destination`

ADD will subtract the `source` from the `destination` and store the result in the `desitnation`.

## MOD
Usage: `MOD Source Destination`

MOD will calulate the remainder of the `source` divided  by the `destination` and store the result in the destination.

## SL
Usage: `SL Source Destination`

SL will bitwise shift the `destination` `source` places to the left and store the result in the destination.

## SR
Usage: `SR Source Destination`

SR will bitwise shift the `destination` `source` places to the right and store the result in the destination.

## AND
Usage: `AND Source Destination`

AND will compute the bitwise and of the `source` and `destination` and store the result in the `destination`.

## XOR
Usage: `XOR Source Destination`

XOR will compute the bitwise-exclusive-or of the `source` and `destination` and store the result in the `destination`.

## OR
Usage: `OR Source Destination`

OR will compute the bitwise-or of the `source` and `destination` and store the result in the `destination`.

## JMP
Usage: `JMP Destination`

JMP will set the program counter to the address of the `destination`

## JEQ
Usage: `JEQ Arg1 Arg2 Destination`

JEQ

## JLT
Usage: `JLT Arg1 Arg2 Destination`

JLT
## JGT
Usage: `JGT Arg1 Arg2 Destination`

JGT

## HALT
Usage: `HALT Source Destination`

HALT
## LOG
Usage: `LOG Source Destination`

LOG
## RANDW
Usage: `RANDW Source Destination`

RANDW
## RANDB
Usage: `RANDB Source Destination`

RANDB
## IN
Usage: `IN Source Destination`

IN
## OUT
Usage: `OUT Source Destination`

Out
