-- Create homepage_settings table
CREATE TABLE IF NOT EXISTS public.homepage_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR NOT NULL UNIQUE,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;

-- Public can read active homepage settings
CREATE POLICY "Public read homepage settings"
  ON public.homepage_settings
  FOR SELECT
  USING (is_active = true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admin insert homepage settings"
  ON public.homepage_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update homepage settings"
  ON public.homepage_settings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin delete homepage settings"
  ON public.homepage_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert default homepage settings
INSERT INTO public.homepage_settings (section, content, is_active, sort_order) VALUES
  ('hero', '{
    "name": "Sheikh Shariar Nehal",
    "greeting": "Hi There,",
    "subtitle": "I Am Into",
    "typingTexts": ["frontend development", "backend development", "web designing", "android development", "web development"],
    "heroImage": "/assets/images/hero.webp",
    "heroImageAlt": "Sheikh Shariar Nehal - Full Stack Web Developer",
    "ctaText": "About Me",
    "ctaLink": "#about"
  }'::jsonb, true, 1),
  
  ('about', '{
    "title": "I''m Sheikh Shariar Nehal",
    "subtitle": "Web Developer",
    "profileImage": "/assets/images/profile2.webp",
    "profileImageAlt": "Sheikh Shariar Nehal Profile Picture - Web Developer and Designer",
    "bio": "I''m Sheikh Shariar Nehal (also known as Shariar Nehal or Sheikh Nehal), a Web Developer and programmer with 3 years of experience. Currently studying B.Sc. in Computer Science and Engineering at Daffodil International University. I know React, Python, JavaScript, and C++, I also good with design tools like Photoshop and Illustrator. I helped create a web app that increased user activity by 40%. I''m detail-oriented and love combining design with tech.",
    "email": "nehal22205101260@diu.edu.bd",
    "location": "Nowabgonj, Dhaka",
    "resumeText": "Resume",
    "resumeUrl": "https://drive.google.com/file/d/1Bs5evFnBecp1zvVXqpe7FglHCZ9EQIKy/view"
  }'::jsonb, true, 2),
  
  ('contact', '{
    "contactImage": "/assets/images/contact1.webp",
    "contactImageAlt": "Contact Sheikh Shariar Nehal - Get In Touch"
  }'::jsonb, true, 3),

  ('seo', '{
    "name": "Sheikh Shariar Nehal",
    "jobTitle": "Full-Stack Web Developer & Designer",
    "description": "Sheikh Shariar Nehal is a Full-Stack Web Developer with 3+ years of experience specializing in React, Next.js, Python, and JavaScript.",
    "email": "nehal22205101260@diu.edu.bd",
    "telephone": "+8801750627421",
    "nationality": "Bangladesh",
    "addressLocality": "Nowabgonj",
    "addressRegion": "Dhaka",
    "addressCountry": "BD",
    "university": "Daffodil International University",
    "universityUrl": "https://daffodilvarsity.edu.bd",
    "github": "https://github.com/sheikhshariarnehal",
    "linkedin": "https://www.linkedin.com/in/shekhshariarnehal/",
    "twitter": "https://twitter.com/shariar_nehal",
    "telegram": "https://t.me/sheikhshariarnehal",
    "instagram": "https://instagram.com/sheikhshariarnehal",
    "facebook": "https://www.facebook.com/sheikhshariarnehal.cse"
  }'::jsonb, true, 4);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_homepage_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER homepage_settings_updated_at
  BEFORE UPDATE ON public.homepage_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_homepage_settings_updated_at();

-- Create storage bucket for homepage images if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'homepage-images',
  'homepage-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for homepage images bucket
CREATE POLICY "Public read homepage images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'homepage-images');

CREATE POLICY "Authenticated upload homepage images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'homepage-images');

CREATE POLICY "Authenticated update homepage images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'homepage-images');

CREATE POLICY "Authenticated delete homepage images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'homepage-images');
