# Avatar Village

Avatar Village is a place where people can gather to hang out in realtime. You can move around within the map and chat with people! Avatar Village is inspired by [2021 Google I/O](https://www.google.co.jp/search?q=google+io+2021+game&hl=en&sxsrf=ALeKk025OgmtgY0wetTWu0ilG65_dxzxgA:1628331177708&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiG2rGr1p7yAhXYfXAKHce4DvcQ_AUoAXoECAEQAw&biw=1394&bih=764).

Come try it out here: https://avatar-village.vercel.app/

Avatar Village utilizes realtime capability of Supabase to enable realtime sync of avatars and chats!

![Main Visual](https://raw.githubusercontent.com/dshukertjr/avatar-village/main/img/visual.png)

## Figma

https://www.figma.com/file/SjMWKsMuLKU5Owgs9pQqPH/Supabase-Hackathon?node-id=2%3A13

## SQL

```sql
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  x real,
  y real,
  face_type text,
  face_color text,
  body_type text,
  body_color text,
  hand_color text,
  leg_color text,
  message text,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE  update_timestamp_column();

```
