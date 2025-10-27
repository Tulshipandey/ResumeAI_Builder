import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets.js'
import { useEffect } from 'react';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PersonalInfoForm from '../components/PersonalInfoForm.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import TemplateSlector from '../components/TemplateSlector.jsx';
import ColorPicker from '../components/ColorPicker.jsx';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm.jsx';
import ExperienceForm from '../components/ExperienceForm.jsx';
import EducationForm from '../components/EducationForm.jsx';
import ProjectForm from '../components/ProjectForm.jsx';
import SkillForm from '../components/SkillForm.jsx';
const ResumeBuilder = () => {

  const {resumeId} = useParams();

  const [resumeData, setResumeData] = useState({
    _id : "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async(resumeId) => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title ;
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);


  const sections = [
    { id: 'personal', name: 'Personal Info' , icon : UserIcon},
    { id: 'summary', name: 'Professional Summary' , icon : FileText},
    { id: 'experience', name: 'Experience' , icon : Briefcase},
    { id: 'education', name: 'Education' , icon : GraduationCap},
    { id: 'project', name: 'Project' , icon : FolderIcon},
    { id: 'skills', name: 'Skills' , icon : Sparkles},
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume(resumeId);
  }, [resumeId])

  const changeResumeVisibility = async() => {
    setResumeData({...resumeData, public: !resumeData.public})
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId ;

    if(navigator.share){
      navigator.share({url: resumeUrl , text: "My Resume", })
    } else {
      alert("Share not supported on this browser");
    }
  }

  const downloadResume = () => {
    window.print();
  }


  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 py-8 '>
          <Link to = {'/app'} className='inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4'/> Back to Dashboard
        </Link>
        </div>

        <div className='max-w-7xl mx-auto px-4 pb-8'>
          <div className='grid lg:grid-cols-12 gap-8'>
            {/* Left Panel */}
            <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>

                {/* progress bar using activeSectionIndex*/}
                <hr className='absolute top-0 left-0 right-0 border-2  border-gray-200' />
                <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{width: `${activeSectionIndex * 100 / (sections.length - 1)}%`}} />

                {/* { Section Navigation\} */}

                <div className='flex justify-between -center mb-6 border-b border-gray-300 py-1'>
                  <div className='flex items-center gap-2'>
                    <TemplateSlector  selectedTemplate={resumeData.template} onChange={(template) => setResumeData((prev) => ({ ...prev, template }))} />
                    <ColorPicker selectedColor = {resumeData.accent_color} onChange={(color) => setResumeData((prev) => ({ ...prev, accent_color: color }))} />
                  </div>
                  <div className='flex items-center'>
                    {activeSectionIndex !== 0 && (
                      <button onClick={()=> setActiveSectionIndex((prevIndex) => Math.max(prevIndex-1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                      disabled={activeSectionIndex === 0} >
                        <ChevronLeft className='size-4'/> Previous
                      </button>
                      
                    )}
                    <button onClick={()=> setActiveSectionIndex((prevIndex) => Math.min(prevIndex+1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length -1 && 'opacity-50'}`}
                      disabled={activeSectionIndex === sections.length - 1} >
                        <ChevronRight className='size-4'/> Next
                      </button>
                  </div>

                </div>

                {/* Form Content */}
                <div className='space-y-6'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev => ({...prev , personal_info: data}))} 
                    removeBackground = {removeBackground} setRemoveBackground={setRemoveBackground} />
                  )}
                  {/* Add other sections here similarly */}
                  {activeSection.id === 'summary' && ( 
                    <ProfessionalSummaryForm data = {resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}))}
                    setResumeData= {setResumeData} />
                  )}
                  {/* ExperienceForm to be added here */}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({...prev, experience: data}))} />
                  )}
                  {/* EducationForm to be added here */}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({...prev, education: data}))} />
                  )}
                  {/* ProjectsForm to be added here */}
                  {activeSection.id === 'project' && (
                    <ProjectForm data={resumeData.projects} onChange={(data) => setResumeData(prev => ({...prev, projects: data}))} />
                  )}
                  {/* SkillsForm to be added here */}
                  {activeSection.id === 'skills' && (
                    <SkillForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({...prev, skills: data}))} />
                  )}


                </div>

                <button className='bg-gradient-to-br from-green-100 to-green-200 ring:green-300 text-green-600 ring hover:ring-green-400
                 transition-all rounded-md px-6 py-2 mt-6 text-sm'>Save Changes</button>
              </div>

            </div>
 


            {/* Right Panel */}
            <div className='lg:col-span-7 max-lg:mt-6'>

              {/* -- buttons -- */}
              <div className='relative w-full'>
                <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                  {resumeData.public && (
                    <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg
                    ring-blue-300 hover:ring transition-colors'>
                      <Share2Icon className='size-4'/> Share
                    </button>
                  )}
                  <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                    {resumeData.public ? <EyeIcon className='size-4' /> : 
                    <EyeOffIcon className='size-4' />}
                    {resumeData.public ? "Public" : "Private"}
                  </button>
                  <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600
                  rounded-lg ring-green-300 hover:ring transition-colors'>
                    <DownloadIcon className='size-4' /> Download
                  </button>
                </div>
              </div> 

              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />

            </div>


          </div>

        </div>
    </div>
  )
}

export default ResumeBuilder