export interface Job {
  id: string;
  title: string;
  company: string;
  salary?: string;
  location?: string;
  image?: string;
}

export interface ApplicationFormValues {
  name: string;
  email: string;
  contact: string;
  reason: string;
}
