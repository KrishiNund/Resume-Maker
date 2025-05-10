interface EducationEntry {
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    degree: string;
    gpa?: string;
  }
  
  interface ExperienceEntry {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  interface SkillsEntry {
    skill: string;
  }
  
  interface ProjectEntry {
    title: string;
    description: string;
    link?: string;
  }
  
  interface ResumePreviewProps {
    name: string;
    email: string;
    phone: string;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    skills: SkillsEntry[];
    projects: ProjectEntry[];
  }
  
  export default function ResumePreview({ name, email, phone, education, experience, skills, projects }: ResumePreviewProps) {
    return (
      <div className="font-serif bg-white p-8 shadow rounded w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">{name || "Firstname Lastname"}</h1>
        <p className="text-center mb-6 text-sm text-gray-600">
          {email || "email@example.com"} • {phone || "(123) 456-7890"}
        </p>
  
        <h2 className="font-bold text-lg border-b mb-2">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between font-semibold">
              <span>{edu.school}</span>
              <span>{edu.location}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{edu.degree}</span>
              <span>{edu.startDate} – {edu.endDate}</span>
            </div>
            {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
          </div>
        ))}
  
        <h2 className="font-bold text-lg border-b mb-2">Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between font-semibold">
              <span>{exp.company}</span>
              <span>{exp.position}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{exp.startDate} – {exp.endDate}</span>
            </div>
            <div>{exp.description}</div>
          </div>
        ))}
  
        <h2 className="font-bold text-lg border-b mb-2">Skills</h2>
        <ul>
          {skills.map((skill, idx) => (
            <li key={idx} className="mb-2">{skill.skill}</li>
          ))}
        </ul>
  
        <h2 className="font-bold text-lg border-b mb-2">Projects</h2>
        {projects.map((proj, idx) => (
          <div key={idx} className="mb-4">
            <div className="font-semibold">{proj.title}</div>
            <div>{proj.description}</div>
            {proj.link && <a href={proj.link} className="text-blue-600">{proj.link}</a>}
          </div>
        ))}
      </div>
    );
}
  