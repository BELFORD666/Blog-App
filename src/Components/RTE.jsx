import React from 'react'
import{Controller} from "react-hook-form"
import{Editor} from"@tinymce/tinymce-react"
const RTE = ({name,label,control,defaultvalues = ""}) => {
  return (
    <div>
      {label&& <label>
         {label}  </label>}

         <Controller 
         name= {name}
         control= {control}
         render={({field:{onChange}})=>
         (
            <Editor
            initialValue={defaultvalues}
            apiKey='0iw4l8n19aqxd0axtl9fk9mpe7lpwf02iokm51i9o7ni7np1'
            init={{
                plugins: [
                  // Core editing features
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                  // Your account includes a free trial of TinyMCE premium features
                  // Try the most popular premium features until May 13, 2025:
                  'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
              }}
              onEditorChange={onChange
                
              }
            
            />
         )}
         />
    </div>
  )
}

export default RTE
