'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';
import { ResumePreviewProps } from '../types/resume';
import { Button } from "../components/ui/button";

export default function DownloadResumeButton(props: ResumePreviewProps) {

  return (
        <PDFDownloadLink
            key={Date.now()}
            document=<ResumePDF
            name={props.name}
            email={props.email}
            phone={props.phone}
            address={props.address}
            link={props.link}
            education={props.education ?? []}
            experience={props.experience ?? []}
            skills={props.skills ?? []}
            projects={props.projects ?? []}
            showEducation={props.showEducation}
            showExperience={props.showExperience}
            showSkills={props.showSkills}
            showProjects={props.showProjects}
            sectionOrder={props.sectionOrder}
            />
            fileName="resume.pdf"
        >

            <Button className="mb-8 w-full">
                Download Resume
            </Button>

        </PDFDownloadLink>
    )
}
