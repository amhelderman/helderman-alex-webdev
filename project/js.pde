

ArrayList<Glower> gs = new ArrayList<Glower>();


void setup()
{
  size(400,250);
  background(0);
  for(int i = 0; i < 100; i++)
  {
    gs.add(new Glower()); 
  }
  
}

void draw()
{
  fill(0, 0, 0,5);
  rect(0,0,width, height);
  for(Glower g : gs)
  {
   g.draw(); 
  }
}


class Glower
{
  PVector p = new PVector();
  color c;
  int direction = 0; // 0=down, 1 = up, 2 = left, 3 = right.
  int seed = int(random(1,10));
  
 Glower()
 {
   p = new PVector(random(0,width), random(0,height));
   c = color(0,0,0);
 }
 
 void draw()
 {
   noStroke();
   fill(c);
   rect(p.x, p.y, 2, 2);
   
   if(frameCount % (seed * 33)==0)
   {
     direction = int(random(0,4));
   }
   
   switch(direction)
   {
     case 0:
     p.y++;
     break;
     case 1:
     p.y--;
     break;
     case 2:
     p.x++;
     break;
     default:
     p.x--;
     break;
   }
   if((p.x < 0) || (p.x > width) || (p.y < 0) || (p.y > height))
   {
     p = new PVector(random(0,width), random(0,height));
     c = color(int(random(0,255)), int(random(0,255)), int(random(0,255)));
   }
 }
  
  
}