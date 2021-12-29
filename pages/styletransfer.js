import Image from 'next/image'

function Styletransfer() {
  
  const src  = "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
 
  

  
  const submitLink = async (event) => {
    event.preventDefault();
    const imurl = event.target.imurl.value;

    const src = imurl

    console.log(src)
    return src
    
  }


    return (
    <div>
    <div>Here we will have the next step that would be the upload of the style image!</div>
    <Image
    // loader={myLoader}
    src={src}
    alt="Picture of the author"
    width={500}
    height={500}
    // placeholder="blur" // placeholder="empty" 
    />
    
      <form className='flex flex-col' onSubmit={submitLink}>
	    <label htmlFor='imurl' className='mb-2 italic'>Image Url</label>
	    <input className='mb-4 border-b-2' id='imurl' name='imurl' type='text' autoComplete='imurl' required />
      
      <button type='submit' className='px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700'>Submit</button>
    </form>
    </div>
    )
  }
  
  
  export default Styletransfer
  
  
