const inquiryForm=document.getElementById('inquiry-form');
const inquiryStatus=document.getElementById('form-status');
const inquiryButton=inquiryForm.querySelector('button[type="submit"]');
let inquirySending=false;
inquiryForm.addEventListener('submit',async event=>{
 event.preventDefault();
 validateEventDate();
 if(inquirySending||!inquiryForm.reportValidity())return;
 const data=new FormData(inquiryForm);
 inquirySending=true;
 inquiryButton.disabled=true;
 inquiryButton.textContent='Sending…';
 inquiryForm.setAttribute('aria-busy','true');
 inquiryStatus.textContent='Sending your event inquiry…';
 inquiryStatus.dataset.state='sending';
 try{
  const response=await fetch(inquiryForm.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
  if(!response.ok)throw new Error('Submission rejected');
  inquiryStatus.textContent='Thanks! Your inquiry has been submitted. We’ll reply by email to discuss availability and your event. Your booking is not yet confirmed.';
  inquiryStatus.dataset.state='success';
  inquiryForm.reset();
 }catch(error){
  inquiryStatus.textContent='We couldn’t confirm your submission. Your details are still here. Please try again, email snapboothnyc@gmail.com, or text 732-630-2880.';
  inquiryStatus.dataset.state='error';
 }finally{
  inquirySending=false;
  inquiryButton.disabled=false;
  inquiryButton.textContent='Send my event inquiry';
  inquiryForm.removeAttribute('aria-busy');
  inquiryStatus.focus();
 }
});
