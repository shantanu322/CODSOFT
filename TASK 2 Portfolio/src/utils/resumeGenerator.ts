import jsPDF from 'jspdf';

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

export const generateResumePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = 30;

  // Personal Information
  const personalInfo: PersonalInfo = {
    name: 'Shantanu Shelake',
    title: 'Full-Stack Developer',
    email: 'Shantanushelake322@gmail.com',
    phone: '917499158711',
    location: 'Dhule India',
    summary: 'Passionate full-stack developer with 5+ years of experience creating web applications that combine beautiful design with robust functionality. Specialized in React, Node.js, and modern web technologies.'
  };

  // Skills
  const skills: Skill[] = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'CSS/Tailwind', level: 88 }
  ];

  // Projects
  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication, payment processing, and admin panel.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      tech: ['React', 'Firebase', 'Material-UI', 'WebSocket']
    },
    {
      title: 'Weather Dashboard',
      description: 'Responsive weather application with location-based forecasts and interactive maps.',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind']
    }
  ];

  // Experience
  const experience: Experience[] = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: [
        'Led development of 5+ web applications serving 10,000+ users',
        'Mentored junior developers and established coding standards',
        'Improved application performance by 40% through optimization'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      description: [
        'Developed responsive websites for 20+ clients',
        'Collaborated with design team to implement pixel-perfect UIs',
        'Integrated third-party APIs and payment systems'
      ]
    }
  ];

  // Education
  const education: Education[] = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'ssvps engineering college , Dhule ',
      year: '2022-2026'
    }
  ];

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 6) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  // Header with name and title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(personalInfo.name, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(personalInfo.title, pageWidth / 2, yPosition, { align: 'center' });

  // Contact Information
  yPosition += 12;
  doc.setFontSize(10);
  const contactInfo = `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`;
  doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });

  // Summary Section
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(personalInfo.summary, margin, yPosition, pageWidth - 2 * margin);

  // Skills Section
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', margin, yPosition);
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const skillsText = skills.map(skill => `${skill.name} (${skill.level}%)`).join(' • ');
  yPosition = addWrappedText(skillsText, margin, yPosition, pageWidth - 2 * margin);

  // Experience Section
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
  
  experience.forEach(exp => {
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.title, margin, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${exp.company} | ${exp.period}`, pageWidth - margin, yPosition, { align: 'right' });
    
    yPosition += 6;
    doc.setFontSize(10);
    exp.description.forEach(desc => {
      yPosition += 5;
      doc.text(`• ${desc}`, margin + 5, yPosition);
    });
  });

  // Projects Section
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY PROJECTS', margin, yPosition);
  
  projects.forEach(project => {
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(project.title, margin, yPosition);
    
    yPosition += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(project.description, margin, yPosition, pageWidth - 2 * margin);
    
    yPosition += 3;
    const techText = `Technologies: ${project.tech.join(', ')}`;
    yPosition = addWrappedText(techText, margin, yPosition, pageWidth - 2 * margin);
  });

  // Education Section
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', margin, yPosition);
  
  education.forEach(edu => {
    yPosition += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(edu.degree, margin, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${edu.school} | ${edu.year}`, pageWidth - margin, yPosition, { align: 'right' });
  });

  // Save the PDF
  doc.save('Alex_Johnson_Resume.pdf');
};