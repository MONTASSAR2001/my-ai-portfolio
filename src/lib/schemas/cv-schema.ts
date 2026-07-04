import { z } from 'zod';

export const cvSchema = z.object({
  name: z.string(),
  role: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      duration: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      duration: z.string().optional().nullable(),
    })
  ).optional().nullable(),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      link: z.string().optional().nullable(),
    })
  ).optional().nullable(),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  cv_url: z.string().optional().nullable(),
});

export type CVData = z.infer<typeof cvSchema>;
