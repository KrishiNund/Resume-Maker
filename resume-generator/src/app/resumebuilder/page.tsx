"use client";

import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { EducationEntry, ExperienceEntry, SkillsEntry, ProjectEntry } from "../types/resume";
import { X, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import dynamic from 'next/dynamic';

const DownloadResumeButton = dynamic(() => import("../components/DownloadButton"), {
  ssr: false,
});

const ResumeViewer = dynamic(() => import("../components/resumeViewer"), {
  ssr: false,
});

export default function ResumeBuilder() {
  // Contact info state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");

  // Section visibility state
  const [showEducation, setShowEducation] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Simple mobile detection
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const [showPreview, setShowPreview] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "Education",
    "Experience",
    "Skills",
    "Projects",
  ]);

  // Data state
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

  // Helper functions
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">Resume Builder</h1> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Controls and settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preview toggle */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <Button 
                onClick={() => setShowPreview(prev => !prev)} 
                className="w-full flex items-center justify-center gap-2"
                variant={showPreview ? "outline" : "default"}
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>

            {/* Sections visibility */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Sections</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Education", checked: showEducation, setter: setShowEducation },
                  { label: "Experience", checked: showExperience, setter: setShowExperience },
                  { label: "Skills", checked: showSkills, setter: setShowSkills },
                  { label: "Projects", checked: showProjects, setter: setShowProjects },
                ].map((section) => (
                  <label
                    key={section.label}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
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
                          section.checked ? "bg-gray-600" : ""
                        }`}
                      />
                      <div
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          section.checked ? "translate-x-5" : ""
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{section.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sections order */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Sections Order</h2>
              <div className="space-y-3">
                {sectionOrder.map((section, index) => (
                  <div
                    key={section}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <span className="text-sm font-medium text-gray-700">{section}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-40 text-gray-500 hover:text-gray-700"
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveSection(index, "down")}
                        disabled={index === sectionOrder.length - 1}
                        className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-40 text-gray-500 hover:text-gray-700"
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download button */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-18">
              <DownloadResumeButton
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
          </div>

          {/* Main content - Form inputs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full"
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <Input 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">LinkedIn/GitHub/Portfolio (Optional)</label>
                  <Input 
                    value={link} 
                    onChange={(e) => setLink(e.target.value)} 
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic sections */}
            <div className="space-y-8">
              {sectionOrder.map((section) => {
                if (section === "Education" && showEducation) {
                  return (
                    <div key="education" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                        <Button 
                          onClick={() => addSection(setEducation, "Education")}
                          variant="outline"
                          size="sm"
                        >
                          + Add Education
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {education.map((edu, index) => (
                          <div key={index} className="relative p-4 border border-gray-200 rounded-lg bg-gray-50">
                            {index > 0 && (
                              <button
                                onClick={() => removeSection(setEducation, index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                aria-label="Remove education"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">School Name</label>
                                <Input 
                                  value={edu.school} 
                                  onChange={(e) => updateField(setEducation, index, "school", e.target.value)} 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Location</label>
                                <Input 
                                  value={edu.location} 
                                  onChange={(e) => updateField(setEducation, index, "location", e.target.value)} 
                                  placeholder="City, State"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Start Date</label>
                                <Input 
                                  value={edu.startDate} 
                                  onChange={(e) => updateField(setEducation, index, "startDate", e.target.value)} 
                                  placeholder="Sep 2018"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">End Date</label>
                                <Input 
                                  value={edu.endDate} 
                                  onChange={(e) => updateField(setEducation, index, "endDate", e.target.value)} 
                                  placeholder="May 2022"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Degree</label>
                                <Input 
                                  value={edu.degree} 
                                  onChange={(e) => updateField(setEducation, index, "degree", e.target.value)} 
                                  placeholder="B.Sc. in Computer Science"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Additional Information (Optional)</label>
                                <Input 
                                  value={edu.comment || ""} 
                                  onChange={(e) => updateField(setEducation, index, "comment", e.target.value)} 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (section === "Experience" && showExperience) {
                  return (
                    <div key="experience" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                        <Button 
                          onClick={() => addSection(setExperience, "Experience")}
                          variant="outline"
                          size="sm"
                        >
                          + Add Experience
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {experience.map((exp, index) => (
                          <div key={index} className="relative p-4 border border-gray-200 rounded-lg bg-gray-50">
                            {index > 0 && (
                              <button
                                onClick={() => removeSection(setExperience, index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                aria-label="Remove experience"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Company Name</label>
                                <Input 
                                  value={exp.company} 
                                  onChange={(e) => updateField(setExperience, index, "company", e.target.value)} 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Position</label>
                                <Input 
                                  value={exp.position} 
                                  onChange={(e) => updateField(setExperience, index, "position", e.target.value)} 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Start Date</label>
                                <Input 
                                  value={exp.startDate} 
                                  onChange={(e) => updateField(setExperience, index, "startDate", e.target.value)} 
                                  placeholder="Jan 2020"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">End Date</label>
                                <Input 
                                  value={exp.endDate} 
                                  onChange={(e) => updateField(setExperience, index, "endDate", e.target.value)} 
                                  placeholder="Dec 2021 or Present"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                  value={exp.description}
                                  onChange={(e) => updateField(setExperience, index, "description", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm resize-none min-h-[100px]"
                                  placeholder="Describe your responsibilities and achievements..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (section === "Skills" && showSkills) {
                  return (
                    <div key="skills" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Skills (one per line or grouped)</label>
                            <textarea
                              value={skill.skill}
                              onChange={(e) => updateField(setSkills, index, "skill", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm resize-none min-h-[120px]"
                              placeholder={`Example:\nProgramming: JavaScript, Python, Java\nFrameworks: React, Node.js\nTools: Git, Docker`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (section === "Projects" && showProjects) {
                  return (
                    <div key="projects" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                        <Button 
                          onClick={() => addSection(setProjects, "Projects")}
                          variant="outline"
                          size="sm"
                        >
                          + Add Project
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {projects.map((project, index) => (
                          <div key={index} className="relative p-4 border border-gray-200 rounded-lg bg-gray-50">
                            {index > 0 && (
                              <button
                                onClick={() => removeSection(setProjects, index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                aria-label="Remove project"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Project Title</label>
                                <Input 
                                  value={project.title} 
                                  onChange={(e) => updateField(setProjects, index, "title", e.target.value)} 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                  value={project.description}
                                  onChange={(e) => updateField(setProjects, index, "description", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm resize-none min-h-[100px]"
                                  placeholder="Describe the project, your role, technologies used, and outcomes..."
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Project Link (Optional)</label>
                                <Input 
                                  value={project.link || ""} 
                                  onChange={(e) => updateField(setProjects, index, "link", e.target.value)} 
                                  placeholder="https://example.com"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

       {/* Improved Preview Section */}
        {showPreview && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              {/* Preview Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Preview Content - Single Scrollable Area */}
              <div className="flex-1 overflow-auto p-6">
                  {isMobile ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Preview not available on mobile devices.</p>
                    </div>
                  ) : (
                    <ResumeViewer
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
                  )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}