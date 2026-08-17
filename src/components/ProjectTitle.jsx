import React from 'react'

// One project is named in Bengali with the transliteration after it, and the
// two halves are not the same language. Marking the whole string lang="bn"
// would have a screen reader read "Hisab Counter" with a Bengali voice;
// marking none of it does the same to the Bengali. So the halves are split at
// the parenthesis and each is labelled for what it is.
//
// Projects without a `titleLang` render as the plain string they always were.
const ProjectTitle = ({ project }) => {
  if (!project.titleLang) return project.title

  const open = project.title.indexOf(' (')

  if (open === -1) return <span lang={project.titleLang}>{project.title}</span>

  return (
    <>
      <span lang={project.titleLang}>{project.title.slice(0, open)}</span>
      {project.title.slice(open)}
    </>
  )
}

export default ProjectTitle
