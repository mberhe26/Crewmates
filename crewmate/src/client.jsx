
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmtgphwcdarbzsquaywz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptdGdwaHdjZGFyYnpzcXVheXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDc4MDEsImV4cCI6MjAyODUyMzgwMX0.Eyr3tMLAwmPGmjhcbkeK2LDCAfk5jFHJCxBzi4tMgM8';
export const supabase = createClient(supabaseUrl, supabaseKey);
