interface EducationEntry {
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    degree: string;
    comment?: string;
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
    address: string;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    skills: SkillsEntry[];
    projects: ProjectEntry[];
    showEducation: boolean;
    showExperience: boolean;
    showSkills: boolean;
    showProjects: boolean;
    sectionOrder: string[];
  }
  
  export default function ResumePreview({ name, email, phone, address, education, experience, skills, projects, showEducation, showExperience, showSkills, showProjects, sectionOrder }: ResumePreviewProps) {
    return (
      <div className="font-serif bg-white p-8 shadow rounded w-full max-w-2xl" style={{ fontFamily: 'Calibri, "Segoe UI", Roboto, sans-serif' }}>
        <h1 className="text-2xl font-bold text-center mb-4">{name || "Firstname Lastname"}</h1>
        <p className="text-center mb-6 text-sm text-gray-600">
          {email || "email@example.com"} • {phone || "(123) 456-7890"} • {address || "123 Main St, City, State, ZIP"}
        </p>

        {sectionOrder.map((section) => {
          if (section === "Education" && showEducation) {
            return (
              <div key="education">
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
                    {edu.comment && <div className="text-sm">{edu.comment}</div>}
                  </div>
                ))}
              </div>
            );
          }

          if (section === "Experience" && showExperience) {
            return (
              <div key="experience">
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
              </div>
            );
          }

          if (section === "Skills" && showSkills) {
            return (
              <div key="skills">
                <h2 className="font-bold text-lg border-b mb-2">Skills</h2>
                <ul>
                  {skills.map((skill, idx) => (
                    <li key={idx} className="mb-2">{skill.skill}</li>
                  ))}
                </ul>
              </div>
            );
          }

          if (section === "Projects" && showProjects) {
            return (
              <div key="projects">
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

          return null;
        })}

      </div>
    );
}
  