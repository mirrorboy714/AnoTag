/*

simple 2d dial

arguments: fgred fggreen fgblue bgred bggreen bgblue dialred dialgreen dialblue

*/

sketch.default2d();
var last_x = 0;
var last_y = 0;

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	
	
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
	
	outlet(0,bang);
}
onclick.local = 1; //private. could be left public to permit "synthetic" events
