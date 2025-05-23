import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumePreviewProps } from '../types/resume';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 40,
    lineHeight: 1.6,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 10,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 6,
    borderBottom: '1 solid #000',
    fontWeight: 'bold',
  },
  entryHeader: {
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subText: {
    fontSize: 10,
    color: 'gray',
  },
  description: {
    fontSize: 10,
  },
  skill: {
    fontSize: 10,
    marginBottom: 2,
  },
});

export function ResumePDF({ name, email, phone, address, link, education, experience, skills, projects, showEducation, showExperience, showSkills, showProjects, sectionOrder }: ResumePreviewProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{name || 'Firstname Lastname'}</Text>
        <Text style={styles.contact}>
          {email || 'email@example.com'} • {phone || '(123) 456-7890'} • {address || '123 Main St, City, State, ZIP'}
          {link && ` • ${link}`}
        </Text>

        {sectionOrder.map((section) => {
          if (section === 'Education' && showEducation) {
            return (
              <View key="education" style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, idx) => (
                  <View key={idx}>
                    <View style={styles.entryHeader}>
                      <Text>{edu.school}</Text>
                      <Text style={styles.subText}>{edu.location}</Text>
                    </View>
                    <View style={styles.entryHeader}>
                      <Text style={styles.subText}>{edu.degree}</Text>
                      <Text style={styles.subText}>{edu.startDate} – {edu.endDate}</Text>
                    </View>
                    {edu.comment && <Text style={styles.description}>{edu.comment}</Text>}
                  </View>
                ))}
              </View>
            );
          }

          if (section === 'Experience' && showExperience) {
            return (
              <View key="experience" style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp, idx) => (
                  <View key={idx}>
                    <View style={styles.entryHeader}>
                      <Text>{exp.company}</Text>
                      <Text style={styles.subText}>{exp.position}</Text>
                    </View>
                    <Text style={styles.subText}>{exp.startDate} – {exp.endDate}</Text>
                    <Text style={styles.description}>{exp.description}</Text>
                  </View>
                ))}
              </View>
            );
          }

          if (section === 'Skills' && showSkills) {
            return (
              <View key="skills" style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={styles.skill}>{skill.skill}</Text>
                ))}
              </View>
            );
          }

          if (section === 'Projects' && showProjects) {
            return (
              <View key="projects" style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map((proj, idx) => (
                  <View key={idx} style={{ marginBottom: 10 }}>
                    <Text style={styles.entryHeader}>{proj.title}</Text>
                    <Text style={styles.description}>{proj.description}</Text>
                    {proj.link?.trim().startsWith("http") && (
                      <Link src={proj.link.trim()} style={styles.subText}>
                        {proj.link.trim()}
                      </Link>
                    )}

                  </View>
                ))}
              </View>
            );
          }

          return null;
        })}
      </Page>
    </Document>
  );
}