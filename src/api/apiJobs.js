// import supabaseClient from "@/utils/supabase";

// // Fetch Jobs
// export async function getJobs(token, { location, company_id, searchQuery }) {
//   const supabase = await supabaseClient(token);
//   let query = supabase
//     .from("jobs")
//     .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

//   if (location) {
//     query = query.eq("location", location);
//   }

//   if (company_id) {
//     query = query.eq("company_id", company_id);
//   }

//   if (searchQuery) {
//     query = query.ilike("title", `%${searchQuery}%`);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching Jobs:", error);
//     return null;
//   }

//   return data;
// }

// // Read Saved Jobs
// export async function getSavedJobs(token) {
//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("saved_jobs")
//     .select("*, job: jobs(*, company: companies(name,logo_url))");

//   if (error) {
//     console.error("Error fetching Saved Jobs:", error);
//     return null;
//   }

//   return data;
// }

// // Read single job
// export async function getSingleJob(token, { job_id }) {
//   const supabase = await supabaseClient(token);
//   let query = supabase
//     .from("jobs")
//     .select(
//       "*, company: companies(name,logo_url), applications: applications(*)",
//     )
//     .eq("id", job_id)
//     .single();

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching Job:", error);
//     return null;
//   }

//   return data;
// }

// // - Add / Remove Saved Job
// export async function saveJob(token, { alreadySaved }, saveData) {
//   const supabase = await supabaseClient(token);

//   if (alreadySaved) {
//     // If the job is already saved, remove it
//     const { data, error: deleteError } = await supabase
//       .from("saved_jobs")
//       .delete()
//       .eq("job_id", saveData.job_id);

//     if (deleteError) {
//       console.error("Error removing saved job:", deleteError);
//       return data;
//     }

//     return data;
//   } else {
//     // If the job is not saved, add it to saved jobs
//     const { data, error: insertError } = await supabase
//       .from("saved_jobs")
//       .insert([saveData])
//       .select();

//     if (insertError) {
//       console.error("Error saving job:", insertError);
//       return data;
//     }

//     return data;
//   }
// }

// // - job isOpen toggle - (recruiter_id = auth.uid())
// export async function updateHiringStatus(token, { job_id }, isOpen) {
//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("jobs")
//     .update({ isOpen })
//     .eq("id", job_id)
//     .select();

//   if (error) {
//     console.error("Error Updating Hiring Status:", error);
//     return null;
//   }

//   return data;
// }

// // get my created jobs
// export async function getMyJobs(token, { recruiter_id }) {
//   const supabase = await supabaseClient(token);

//   const { data, error } = await supabase
//     .from("jobs")
//     .select("*, company: companies(name,logo_url)")
//     .eq("recruiter_id", recruiter_id);

//   if (error) {
//     console.error("Error fetching Jobs:", error);
//     return null;
//   }

//   return data;
// }

// // Delete job
// export async function deleteJob(token, { job_id }) {
//   const supabase = await supabaseClient(token);

//   const { data, error: deleteError } = await supabase
//     .from("jobs")
//     .delete()
//     .eq("id", job_id)
//     .select();

//   if (deleteError) {
//     console.error("Error deleting job:", deleteError);
//     return data;
//   }

//   return data;
// }

// // - post job
// export async function addNewJob(token, _, jobData) {
//   const supabase = await supabaseClient(token);

//   const { data, error } = await supabase
//     .from("jobs")
//     .insert([jobData])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Error Creating Job");
//   }

//   return data;
// }

import supabaseClient from "@/utils/supabase";

// ===============================
// Fetch Jobs
// ===============================
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, saved:saved_jobs(id), company:companies(name,logo_url)");

  if (location) {
    query = query.ilike("location", `%${location}%`);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// ===============================
// Saved Jobs
// ===============================
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

// ===============================
// Single Job
// ===============================
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies(name,logo_url),
      applications:applications(*)
      `,
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

// ===============================
// Save / Unsave Job
// ===============================
// ===============================
// Save / Unsave Job
// ===============================
export async function saveJob(token, _, saveData) {
  const supabase = await supabaseClient(token);

  const { data: existingSavedJob, error: checkError } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("job_id", saveData.job_id)
    .eq("user_id", saveData.user_id)
    .limit(1)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking saved job:", checkError);
    throw new Error("Unable to update saved job.");
  }

  if (existingSavedJob) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id)
      .eq("user_id", saveData.user_id)
      .select();

    if (error) {
      console.error("Error removing saved job:", error);
      throw new Error("Unable to remove saved job.");
    }

    return {
      saved: false,
      data,
    };
  }

  const { data, error } = await supabase
    .from("saved_jobs")
    .insert([saveData])
    .select();

  if (error) {
    console.error("Error saving job:", error);
    throw new Error("Unable to save job.");
  }

  return {
    saved: true,
    data,
  };
}

// ===============================
// Hiring Status
// ===============================
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

// ===============================
// Recruiter's Jobs
// ===============================
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// ===============================
// Delete Job
// ===============================
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error deleting job:", error);
    return null;
  }

  return data;
}

// ===============================
// Create Job
// ===============================
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}
