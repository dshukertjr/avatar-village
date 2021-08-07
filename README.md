# Avatar Village

![Main Visual](https://raw.githubusercontent.com/dshukertjr/avatar-village/main/img/visual.png)

Avatar Village is a place where people can gather to hang out. You can move around within the map and chat with people!

## Figma

https://www.figma.com/file/SjMWKsMuLKU5Owgs9pQqPH/Supabase-Hackathon?node-id=2%3A13

## SQL

```sql
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  x real,
  y real,
  face_type text,
  face_color text,
  body_type text,
  body_color text,
  hand_color text,
  leg_color text,
  message text
);
```
