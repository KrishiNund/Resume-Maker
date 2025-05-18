"use client";

import { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { EducationEntry, ExperienceEntry, SkillsEntry, ProjectEntry } from "../types/resume";
import ResumePreview from "../components/ResumePreview";
import { X } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';


export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");

  const [showEducation, setShowEducation] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  

  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "Education",
    "Experience",
    "Skills",
    "Projects",
  ]);


  const [education, setEducation] = useState<EducationEntry[]>([{
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    degree: "",
    comment: "",
  }]);
  
  const [experience, setExperience] = useState<ExperienceEntry[]>([{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  }]);
  
  const [skills, setSkills] = useState<SkillsEntry[]>([{
    skill: "",
  }]);
  
  const [projects, setProjects] = useState<ProjectEntry[]>([{
    title: "",
    description: "",
    link: "",
  }]);

  {/* creating a ref to wrap resume preview */}
  const previewRef = useRef<HTMLDivElement>(null);

  const updateField = <T extends EducationEntry | ExperienceEntry | SkillsEntry | ProjectEntry>(
    stateUpdater: React.Dispatch<React.SetStateAction<T[]>>, 
    index: number, 
    field: keyof T, 
    value: string
  ) => {
    stateUpdater(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
    });
  };

  const addSection = <T extends EducationEntry | ExperienceEntry | SkillsEntry | ProjectEntry>(
  stateUpdater: React.Dispatch<React.SetStateAction<T[]>>,
  sectionType: string
  ) => {
    let emptyEntry: T;

    switch (sectionType) {
      case "Education":
        emptyEntry = {
          school: "",
          location: "",
          startDate: "",
          endDate: "",
          degree: "",
          comment: "",
        } as T;
        break;
      case "Experience":
        emptyEntry = {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        } as T;
        break;
      case "Skills":
        emptyEntry = {
          skill: "",
        } as T;
        break;
      case "Projects":
        emptyEntry = {
          title: "",
          description: "",
          link: "",
        } as T;
        break;
      default:
        emptyEntry = {} as T;
    }

    stateUpdater(prev => [...prev, emptyEntry]);
  };


  const removeSection = <T extends unknown>(
    stateUpdater: React.Dispatch<React.SetStateAction<T[]>>,
    index: number
  ) => {
    stateUpdater(prev => prev.filter((_, i) => i !== index));
  };
  
  const moveSection = (index: number, direction: "up" | "down") => {
    setSectionOrder((prev) => {
      const newOrder = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newOrder.length) return prev;
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      return newOrder;
    });
  };

  const handleDownload = async () => {
    console.log("Trying to download resume...");

    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) return;

    const scale = 2; // Increase to 3 or 4 if needed, but beware of performance
    const canvas = await html2canvas(resumeElement, {
      scale: scale, // <-- this improves quality
      useCORS: true, // helpful if using external assets
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        {/* //SECTION: Contact details */}
        <h2 className="text-xl font-semibold">Contact</h2>
        <div className="relative space-y-3 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <Input placeholder="LinkedIn/Github/Portfolio (Optional)" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>

        {/* //SECTION: Resume Sections selection */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mb-6">
          {[
            { label: "Education", checked: showEducation, setter: setShowEducation },
            { label: "Experience", checked: showExperience, setter: setShowExperience },
            { label: "Skills", checked: showSkills, setter: setShowSkills },
            { label: "Projects", checked: showProjects, setter: setShowProjects },
          ].map((section) => (
            <label
              key={section.label}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={section.checked}
                  onChange={() => {
                    section.setter(!section.checked);
                    setSectionOrder((prevOrder) => {
                      if (section.checked) {
                        return prevOrder.filter((s) => s !== section.label);
                      } else {
                        return [...prevOrder, section.label];
                      }
                    });
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-5 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ${
                    section.checked ? "bg-gray-700" : ""
                  }`}
                />
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    section.checked ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="text-sm font-medium">{section.label}</span>
            </label>
          ))}
        </div>


        {/* //SECTION: Resume Sections order */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-gray-800">Sections Order</h3>
          <div className="space-y-2">
            {sectionOrder.map((section, index) => (
              <div
                key={section}
                className="flex items-center justify-between px-4 py-2 rounded-xl bg-muted shadow-sm hover:shadow transition-all"
              >
                <span className="text-sm font-medium text-gray-700">{section}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSection(index, "up")}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-40"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveSection(index, "down")}
                    disabled={index === sectionOrder.length - 1}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-40"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
          
        {/* //SECTION: Resume Sections content */}
        {/* rendered according to the order of sections in sectionOrder*/}
        {sectionOrder.map((section) => {
            if (section ==="Education" && showEducation) {
              return (
                <div key="education">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <div className="space-y-6 mb-6">
                    {education.map((edu, index) => (
                      <div key={index} className="relative space-y-3 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
                        {index > 0 && (
                          <button
                            onClick={() => removeSection(setEducation, index)}
                            className="absolute top-1 right-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <Input className="rounded-md" placeholder="School Name" value={edu.school} onChange={(e) => updateField(setEducation, index, "school", e.target.value)} />
                        <Input className="rounded-md" placeholder="Location (City, State)" value={edu.location} onChange={(e) => updateField(setEducation, index, "location", e.target.value)} />
                        <Input className="rounded-md" placeholder="Start Date (e.g., Sep 2018)" value={edu.startDate} onChange={(e) => updateField(setEducation, index, "startDate", e.target.value)} />
                        <Input className="rounded-md" placeholder="End Date (e.g., May 2022)" value={edu.endDate} onChange={(e) => updateField(setEducation, index, "endDate", e.target.value)} />
                        <Input className="rounded-md" placeholder="Degree (e.g., B.Sc. in Computer Science)" value={edu.degree} onChange={(e) => updateField(setEducation, index, "degree", e.target.value)} />
                        <Input className="rounded-md" placeholder="Comment (optional)" value={edu.comment || ""} onChange={(e) => updateField(setEducation, index, "comment", e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <Button className="mb-8" onClick={() => addSection(setEducation, "Education")}>+ Add More Education</Button>
                </div>
              );
            }

            if (section === "Experience" && showExperience) {
              return(
                <div key="experience">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  <div className="space-y-6 mb-6"> 
                    {experience.map((exp, index) => (
                      <div key={index} className="relative space-y-3 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
                          {index > 0 && (
                            <button
                              onClick={() => removeSection(setExperience, index)}
                              className="absolute top-1 right-2 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          <Input placeholder="Company Name" value={exp.company} onChange={(e) => updateField(setExperience, index, "company", e.target.value)} />
                          <Input placeholder="Position" value={exp.position} onChange={(e) => updateField(setExperience, index, "position", e.target.value)} />
                          <Input placeholder="Start Date (e.g., Jan 2020)" value={exp.startDate} onChange={(e) => updateField(setExperience, index, "startDate", e.target.value)} />
                          <Input placeholder="End Date (e.g., Dec 2021)" value={exp.endDate} onChange={(e) => updateField(setExperience, index, "endDate", e.target.value)} />
                          <textarea
                            placeholder="Description"
                            value={exp.description}
                            onChange={(e) => updateField(setExperience, index, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm resize-none min-h-[100px]"
                          />
                        </div>
                      ))}
                  </div>
                  <Button className="mb-8" onClick={() => addSection(setExperience, "Experience")}>+ Add More Experience</Button>
                </div>
              )
            }

            if (section === "Skills" && showSkills) {
              return (
                <div key="skills">
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <div className="space-y-6 mb-6">
                    {skills.map((skill, index) => (
                      <div key={index} className="relative space-y-3 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
                        {index > 0 && (
                            <button
                                onClick={() => removeSection(setSkills, index)}
                                className="absolute top-1 right-2 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <textarea
                            placeholder= {`Technical:\nFrameworks:\nLanguages:`}
                            value={skill.skill}
                            onChange={(e) => updateField(setSkills, index, "skill", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm resize-none min-h-[100px]"
                          />
                      </div>
                    ))}
                  </div>
                  
                  {/* <Button className="mb-8" onClick={() => addSection(setSkills, "Skills")}>+ Add More Skill</Button> */}
                </div>
              )
            }

            if (section === "Projects" && showProjects) {
              return(
                <div key="projects">
                  <h2 className="text-xl font-semibold mb-4">Projects</h2>
                  <div className="space-y-6 mb-6">
                    {projects.map((project, index) => (
                      <div key={index} className="relative space-y-3 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
                        {index > 0 && (
                            <button
                                onClick={() => removeSection(setProjects, index)}
                                className="absolute top-1 right-2 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <Input placeholder="Project Title" value={project.title} onChange={(e) => updateField(setProjects, index, "title", e.target.value)} />
                        <textarea
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) => updateField(setProjects, index, "description", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm resize-none min-h-[100px]"
                        />
                        <Input placeholder="Project Link (optional)" value={project.link || ""} onChange={(e) => updateField(setProjects, index, "link", e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <Button className="mb-8" onClick={() => addSection(setProjects, "Projects")}>+ Add More Projects</Button>
                </div> 
              )
            }
            return null;
        })}

        {/* <Button onClick={handleDownload} className="mt-4">Download PDF</Button> */}
        <Button onClick={handleDownload}>Download</Button>


      </div>
        <ResumePreview
          name={name} 
          email={email} 
          phone={phone} 
          address={address} 
          link={link} 
          education={education} 
          experience={experience} 
          skills={skills} 
          projects={projects} 
          showEducation={showEducation} 
          showExperience={showExperience} 
          showSkills={showSkills} 
          showProjects={showProjects} 
          sectionOrder={sectionOrder}
        />
      
    </div>
  );
}
