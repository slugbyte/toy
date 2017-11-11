``` asm
# first program
memory.load(compiler.compile(`
_main
	MOV fff B
  JMP _loop

_loop
  JGT A B _done
  ADD 1 A
  JMP _loop
	
_done
  HALT 
`))
setInterval(() => cpu.tick())
```
