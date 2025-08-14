
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qwqajsppakjsdpwlpsor.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cWFqc3BwYWtqc2Rwd2xwc29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNDIwODIsImV4cCI6MjA2ODYxODA4Mn0.wqA3q2-VWF424gGNfYpbvzZJ7SEvSRwx3qO9AcO6RfE' 

export const supabase = createClient(supabaseUrl, supabaseKey)
