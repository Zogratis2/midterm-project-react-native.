import React from 'react';
import { View, Text, Image, ScrollView, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../context/ThemeContext'; 
import { useJobs } from '../../context/JobsContext'; 
import RenderHtml from 'react-native-render-html'; 

const JobDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();
  const { width } = useWindowDimensions(); 
  
  const { appliedJobs } = useJobs();
  const { job, isSaved } = route.params; 

  const validImageUrl = job.image && job.image.startsWith('http') 
    ? job.image 
    : 'https://via.placeholder.com/150';

  const hasApplied = appliedJobs?.includes(job.id);

  // ⭐ THE FIX: This smart function reads the text and formats it beautifully
  const formatJobText = (rawText: string) => {
    if (!rawText) return '<p>No detailed description available.</p>';

    // Split the raw text into individual lines and remove empty spaces
    const lines = rawText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let html = '';
    let isListMode = false;

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase();

      // 1. Check if the line is a section header for Requirements or Benefits
      if (lowerLine.includes('requirements') || lowerLine.includes('benefits') || lowerLine.includes('qualifications')) {
        if (isListMode) {
          html += '</ul>'; // Close the previous list if we had one
        } else if (html !== '') {
          html += '</p>'; // Close the paragraph
        }
        // Start a new bulleted list
        html += `<h3>${line}</h3><ul>`;
        isListMode = true;
      } 
      // 2. Check if it's the Description header
      else if (lowerLine.includes('description')) {
        if (html !== '') html += '</p>';
        // Start a standard paragraph
        html += `<h3>${line}</h3><p>`;
        isListMode = false;
      } 
      // 3. Regular text line
      else {
        if (isListMode) {
          // If we are under Requirements/Benefits, make it a bullet point
          html += `<li>${line}</li>`;
        } else {
          // If we are under Description, join it into a paragraph with a space
          if (html === '') html += '<p>';
          html += `${line} `;
        }
      }
    });

    // Close any open tags at the very end
    if (isListMode) {
      html += '</ul>';
    } else {
      html += '</p>';
    }

    return html;
  };

  // Run the job description through our new smart formatter
  const properlyFormattedHtml = formatJobText(job.description);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: validImageUrl }} style={styles.headerImage} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
        <Text style={[styles.company, { color: colors.primary || '#007bff' }]}>{job.company}</Text>
        
        <View style={[styles.divider, { backgroundColor: colors.border || '#e0e0e0' }]} />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Details</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>📍 Location: {job.location || 'Remote'}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>💰 Salary: {job.salary || 'Not specified'}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>📅 Type: {job.type || 'Full-time'}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border || '#e0e0e0' }]} />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Description</Text>
        
        {/* Pass our newly formatted smart HTML to the renderer */}
        <RenderHtml
          contentWidth={width}
          source={{ html: properlyFormattedHtml }}
          baseStyle={{ 
            color: colors.text, 
            fontSize: 16, 
            lineHeight: 24 
          }} 
          tagsStyles={{
            p: { marginBottom: 15 },
            h3: { marginTop: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold' },
            ul: { marginBottom: 15, marginLeft: -10 }, 
            li: { marginBottom: 8 }, 
          }}
        />

        <Pressable
          style={[
            styles.applyButton, 
            { 
              backgroundColor: hasApplied ? '#6c757d' : '#28a745',
              opacity: hasApplied ? 0.6 : 1 
            }
          ]}
          onPress={() => navigation.navigate('ApplicationForm', { job, fromSaved: isSaved })}
          disabled={hasApplied} 
        >
          <Text style={styles.applyButtonText}>
            {hasApplied ? 'Successfully Applied' : 'Apply Now'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  applyButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JobDetailsScreen;