import { ResumePreviewProps } from "../types/resume";
  
export default function ResumePreview({ name, email, phone, address, link, education, experience, skills, projects, showEducation, showExperience, showSkills, showProjects, sectionOrder }: ResumePreviewProps) {
  return (
    <div
      className="font-serif bg-white p-4 md:p-8 shadow rounded w-full max-w-2xl mx-auto"
      style={{
        fontFamily: 'Calibri, "Segoe UI", Roboto, sans-serif',
        width: '8.27in',
        height: '11.69in',
        padding: '0.5in',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <h1 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-4 whitespace-pre-line break-words">
        {name || "Firstname Lastname"}
      </h1>
      <p className="text-center mb-4 md:mb-6 text-sm text-gray-600 whitespace-pre-line break-words">
        {email || "email@example.com"} • {phone || "(123) 456-7890"} • {address || "123 Main St, City, State, ZIP"}
        {link && <> • {link}</>}
      </p>

      {sectionOrder.map((section) => {
        if (section === "Education" && showEducation) {
          return (
            <div key="education" className="mb-6">
              <h2 className="font-bold text-lg border-b mb-2">Education</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between font-semibold whitespace-pre-line break-all">
                    <span>{edu.school}</span>
                    <span className="text-sm text-gray-500">{edu.location}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between text-sm whitespace-pre-line break-all">
                    <span>{edu.degree}</span>
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.comment && <div className="text-sm mt-1 whitespace-pre-line break-words">{edu.comment}</div>}
                </div>
              ))}
            </div>
          );
        }

        if (section === "Experience" && showExperience) {
          return (
            <div key="experience" className="mb-6">
              <h2 className="font-bold text-lg border-b mb-2 ">Experience</h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between font-semibold whitespace-pre-line break-all">
                    <span>{exp.company}</span>
                    <span className="text-sm text-gray-500">{exp.position}</span>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-line break-words">{exp.startDate} – {exp.endDate}</div>
                  <div className="text-sm whitespace-pre-line break-words">{exp.description}</div>
                </div>
              ))}
            </div>
          );
        }

        if (section === "Skills" && showSkills) {
          return (
            <div key="skills" className="mb-6">
              <h2 className="font-bold text-lg border-b mb-2">Skills</h2>
              <ul className="text-sm grid gap-y-2 list-disc list-inside whitespace-pre-line break-all">
                {skills.map((skill, idx) => (
                  <div key={idx} className="text-sm">{skill.skill}</div>
                ))}
              </ul>
            </div>
          );
        }

        if (section === "Projects" && showProjects) {
          return (
            <div key="projects" className="mb-6">
              <h2 className="font-bold text-lg border-b mb-2">Projects</h2>
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-4 whitespace-pre-line break-words">
                  <div className="font-semibold">{proj.title}</div>
                  <div className="text-sm">{proj.description}</div>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 text-sm break-words">
                      {proj.link}
                    </a>
                  )}
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
  