"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import ResumePreview from "../components/ResumePreview";
import { X } from "lucide-react";

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

export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [education, setEducation] = useState<EducationEntry[]>([{
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    degree: "",
    gpa: "",
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
    stateUpdater: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const emptyEntry = {} as T;
    stateUpdater(prev => [...prev, emptyEntry]);
  };

  const removeSection = <T extends unknown>(
    stateUpdater: React.Dispatch<React.SetStateAction<T[]>>,
    index: number
  ) => {
    stateUpdater(prev => prev.filter((_, i) => i !== index));
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        
        <h2 className="text-xl font-semibold">Contact</h2>
        <div className="relative space-y-3 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        
        <h2 className="text-xl font-semibold">Education</h2>
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
                <Input className="rounded-md" placeholder="GPA (optional)" value={edu.gpa || ""} onChange={(e) => updateField(setEducation, index, "gpa", e.target.value)} />
            </div>
        ))}
        <Button onClick={() => addSection(setEducation)}>+ Add More Education</Button>

        <h2 className="text-xl font-semibold">Experience</h2>
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
            <Input placeholder="Description" value={exp.description} onChange={(e) => updateField(setExperience, index, "description", e.target.value)} />
          </div>
        ))}
        <Button onClick={() => addSection(setExperience)}>+ Add More Experience</Button>

        <h2 className="text-xl font-semibold">Skills</h2>
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
            <Input placeholder="Skill" value={skill.skill} onChange={(e) => updateField(setSkills, index, "skill", e.target.value)} />
          </div>
        ))}
        <Button onClick={() => addSection(setSkills)}>+ Add More Skill</Button>

        <h2 className="text-xl font-semibold">Projects</h2>
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
            <Input placeholder="Description" value={project.description} onChange={(e) => updateField(setProjects, index, "description", e.target.value)} />
            <Input placeholder="Project Link (optional)" value={project.link || ""} onChange={(e) => updateField(setProjects, index, "link", e.target.value)} />
          </div>
        ))}
        <Button onClick={() => addSection(setProjects)}>+ Add More Projects</Button>
      </div>

      <ResumePreview name={name} email={email} phone={phone} education={education} experience={experience} skills={skills} projects={projects} />
    </div>
  );
}
