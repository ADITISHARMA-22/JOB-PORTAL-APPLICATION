//

import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// =============================
// Apply to Job (Candidate)
// =============================
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  // Check if candidate has already applied
  const { data: existingApplication, error: checkError } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobData.job_id)
    .eq("candidate_id", jobData.candidate_id)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking existing application:", checkError);
    throw new Error("Unable to verify previous applications.");
  }

  if (existingApplication) {
    throw new Error("You have already applied for this job.");
  }

  // Upload Resume
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error(storageError);
    throw new Error("Error uploading Resume");
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // Insert Application
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}

// =============================
// Update Application Status
// =============================
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || !data?.length) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

// =============================
// Get Candidate Applications
// =============================
export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      job:jobs(
        id,
        title,
        company:companies(
          name,
          logo_url
        )
      )
      `,
    )
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
