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
  projectLink:{
    fontSize: 9,
    color: 'gray',
    textDecoration: 'none'
  }
});

export function ResumePDF({
  name = '',
  email = '',
  phone = '',
  address = '',
  link = '',
  education = [],
  experience = [],
  skills = [],
  projects = [],
  showEducation,
  showExperience,
  showSkills,
  showProjects,
  sectionOrder = []
}: ResumePreviewProps) {

  const safeText = (text: any) => typeof text === 'string' ? text : '';
  const safeArray = (arr: any) => Array.isArray(arr) ? arr : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{safeText(name) || 'Firstname Lastname'}</Text>
        <Text style={styles.contact}>
          {safeText(email) || 'email@example.com'} • {safeText(phone) || '(123) 456-7890'} • {safeText(address) || '123 Main St, City, State, ZIP'}
          {safeText(link) && ` • ${safeText(link)}`}
        </Text>

        {safeArray(sectionOrder).map((section, i) => {
          if (section === 'Education' && showEducation && education.length > 0) {
            return (
              <View key={`section-${i}`} style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, idx) => (
                  <View key={idx} style={{ marginBottom: 1 }}>
                    <View style={styles.entryHeader}>
                      <Text>{safeText(edu?.school)}</Text>
                      <Text style={styles.subText}>{safeText(edu?.location)}</Text>
                    </View>
                    <View style={styles.entryHeader}>
                      <Text style={styles.subText}>{safeText(edu?.degree)}</Text>
                      <Text style={styles.subText}>{safeText(edu?.startDate)} – {safeText(edu?.endDate)}</Text>
                    </View>
                    {safeText(edu?.comment) && <Text style={styles.description}>{safeText(edu?.comment)}</Text>}
                  </View>
                ))}
              </View>
            );
          }

          if (section === 'Experience' && showExperience && experience.length > 0) {
            return (
              <View key={`section-${i}`} style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp, idx) => (
                  <View key={idx} style={{ marginBottom: 1 }}>
                    <View style={styles.entryHeader}>
                      <Text>{safeText(exp?.company)}</Text>
                      <Text style={styles.subText}>{safeText(exp?.position)}</Text>
                    </View>
                    <Text style={styles.subText}>{safeText(exp?.startDate)} – {safeText(exp?.endDate)}</Text>
                    <Text style={styles.description}>{safeText(exp?.description)}</Text>
                  </View>
                ))}
              </View>
            );
          }

          if (section === 'Skills' && showSkills && skills.length > 0) {
            return (
              <View key={`section-${i}`} style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={styles.skill}>{safeText(skill?.skill)}</Text>
                ))}
              </View>
            );
          }

          if (section === 'Projects' && showProjects && projects.length > 0) {
            return (
              <View key={`section-${i}`} style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map((proj, idx) => (
                  <View key={idx} style={{ marginBottom: 5 }}>
                    <Text style={styles.entryHeader}>{safeText(proj?.title)}</Text>
                    <Text style={styles.description}>{safeText(proj?.description)}</Text>
                    {safeText(proj?.link).startsWith("http") && (
                      <Link src={safeText(proj?.link)} style={styles.projectLink}>
                        {safeText(proj?.link)}
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