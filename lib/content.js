import { supabase } from './supabase';

// Fallback data for when Supabase is not configured
const FALLBACK_CONTENT = {
  hero_title: 'UAE Tax & Accounting Solutions',
  hero_subtitle: 'Expert guidance for corporate tax, VAT compliance, and financial advisory services',
  hero_cta: 'Get Expert Consultation',
  about_mission: 'To provide comprehensive tax and accounting solutions that empower UAE businesses to achieve sustainable growth and regulatory compliance',
  about_vision: 'To be the most trusted tax advisory partner for UAE businesses, known for expertise, innovation, and client success',
  about_description: 'Sage Consultancy is a leading UAE-based tax and accounting firm dedicated to helping businesses navigate complex tax regulations, optimize financial operations, and achieve their growth objectives. With 12 years of industry experience and a team of qualified professionals, we deliver tailored solutions for startups, SMEs, and large corporations.',
  counter_clients: '950',
  counter_saved: '120',
  counter_industries: '35',
  counter_years: '12',
  contact_phone: '+971 58 570 4140',
  contact_email: 'info@sageconsultancy.ae',
  contact_location: 'Dubai, U.A.E',
  footer_tagline: 'Your trusted partner for tax compliance and financial excellence in the UAE',
};

const FALLBACK_SERVICES = [
  {
    id: '1',
    slug: 'vat',
    category: 'tax',
    name_en: 'VAT Registration & Compliance',
    name_ar: 'تسجيل ضريبة القيمة المضافة والامتثال',
    description_en: 'Complete VAT registration and compliance services tailored to your business needs',
    description_ar: 'خدمات تسجيل ضريبة القيمة المضافة والامتثال الكاملة المخصصة لاحتياجات عملك',
    icon: 'receipt',
  },
  {
    id: '2',
    slug: 'corporate-tax',
    category: 'tax',
    name_en: 'Corporate Income Tax',
    name_ar: 'ضريبة دخل الشركات',
    description_en: 'Strategic corporate tax planning and compliance for UAE businesses',
    description_ar: 'تخطيط ضريبة دخل الشركات الاستراتيجي والامتثال للشركات الإماراتية',
    icon: 'briefcase',
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: '1',
    name: 'Fatima Al-Suwaidi',
    title: 'Finance Director',
    company: 'AltimaCare LLC',
    quote_en: 'Sage Consultancy successfully navigated our complex VAT audit with the FTA. Their expertise and attention to detail saved us significant time and stress. Highly recommended!',
    quote_ar: 'تنقلت Sage Consultancy بنجاح من خلال تدقيق ضريبة القيمة المضافة المعقد لدينا مع سلطة الضرائب الفيدرالية. أدت خبرتهم واهتمامهم بالتفاصيل إلى توفير وقت وضغط كبير. موصى به بشدة!',
    rating: 5,
  },
];

const FALLBACK_FAQS = [
  {
    id: '1',
    question_en: 'What is the UAE corporate tax rate?',
    question_ar: 'ما هو معدل ضريبة دخل الشركات في الإمارات؟',
    answer_en: 'The UAE does not levy corporate income tax on most businesses. However, certain sectors like oil and gas are subject to specific rates.',
    answer_ar: 'لا تفرض الإمارات ضريبة دخل على معظم الشركات. ومع ذلك، تخضع قطاعات معينة مثل النفط والغاز لمعدلات محددة.',
    category: 'tax',
  },
];

/**
 * Get all site content for a specific section
 * @param {string} section - Content section (e.g., 'hero', 'about', 'counters', 'contact', 'footer')
 * @returns {Promise<Object>} Object with content key-value pairs
 */
export async function getContent(section) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return getFallbackContentBySection(section);
    }

    const { data, error } = await supabase
      .from('site_content')
      .select('key, value_en, value_ar')
      .eq('section', section);

    if (error) {
      console.error('Error fetching content:', error);
      return getFallbackContentBySection(section);
    }

    const result = {};
    data?.forEach((item) => {
      result[item.key] = {
        en: item.value_en,
        ar: item.value_ar,
      };
    });

    return result;
  } catch (error) {
    console.error('Error in getContent:', error);
    return getFallbackContentBySection(section);
  }
}

/**
 * Get a single content entry by key
 * @param {string} key - Content key
 * @returns {Promise<Object>} Content object with en and ar values
 */
export async function getContentByKey(key) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {
        en: FALLBACK_CONTENT[key] || '',
        ar: FALLBACK_CONTENT[key] || '',
      };
    }

    const { data, error } = await supabase
      .from('site_content')
      .select('value_en, value_ar')
      .eq('key', key)
      .single();

    if (error) {
      console.error('Error fetching content by key:', error);
      return {
        en: FALLBACK_CONTENT[key] || '',
        ar: FALLBACK_CONTENT[key] || '',
      };
    }

    return {
      en: data?.value_en || '',
      ar: data?.value_ar || '',
    };
  } catch (error) {
    console.error('Error in getContentByKey:', error);
    return {
      en: FALLBACK_CONTENT[key] || '',
      ar: FALLBACK_CONTENT[key] || '',
    };
  }
}

/**
 * Get all services, optionally filtered by category
 * @param {string|null} category - Optional category filter ('tax', 'accounting', 'corporate')
 * @returns {Promise<Array>} Array of service objects
 */
export async function getServices(category = null) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return category
        ? FALLBACK_SERVICES.filter((s) => s.category === category)
        : FALLBACK_SERVICES;
    }

    let query = supabase.from('services').select('*').eq('is_active', true).order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching services:', error);
      return category ? FALLBACK_SERVICES.filter((s) => s.category === category) : FALLBACK_SERVICES;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getServices:', error);
    return category ? FALLBACK_SERVICES.filter((s) => s.category === category) : FALLBACK_SERVICES;
  }
}

/**
 * Get a single service by slug
 * @param {string} slug - Service slug
 * @returns {Promise<Object|null>} Service object or null if not found
 */
export async function getServiceBySlug(slug) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return FALLBACK_SERVICES.find((s) => s.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching service by slug:', error);
      return FALLBACK_SERVICES.find((s) => s.slug === slug) || null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in getServiceBySlug:', error);
    return FALLBACK_SERVICES.find((s) => s.slug === slug) || null;
  }
}

/**
 * Get all active testimonials
 * @returns {Promise<Array>} Array of testimonial objects
 */
export async function getTestimonials() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return FALLBACK_TESTIMONIALS;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return FALLBACK_TESTIMONIALS;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTestimonials:', error);
    return FALLBACK_TESTIMONIALS;
  }
}

/**
 * Get all active FAQs, optionally filtered by category
 * @param {string|null} category - Optional category filter
 * @returns {Promise<Array>} Array of FAQ objects
 */
export async function getFAQs(category = null) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return category ? FALLBACK_FAQS.filter((f) => f.category === category) : FALLBACK_FAQS;
    }

    let query = supabase.from('faqs').select('*').eq('is_active', true).order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching FAQs:', error);
      return category ? FALLBACK_FAQS.filter((f) => f.category === category) : FALLBACK_FAQS;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFAQs:', error);
    return category ? FALLBACK_FAQS.filter((f) => f.category === category) : FALLBACK_FAQS;
  }
}

/**
 * Get published blog posts with pagination
 * @param {number} limit - Number of posts to return
 * @param {number} offset - Number of posts to skip
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function getBlogPosts(limit = 10, offset = 0) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return [];
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object|null>} Blog post object or null if not found
 */
export async function getBlogPostBySlug(slug) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return null;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return null;
  }
}

/**
 * Submit a contact form
 * @param {Object} data - Contact form data {name, email, phone, subject, message}
 * @returns {Promise<Object>} Submitted contact object with id
 */
export async function submitContactForm(data) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn('Contact form submission failed: Supabase not configured');
      return { error: 'Database not configured' };
    }

    const { data: result, error } = await supabase.from('contact_submissions').insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        is_read: false,
      },
    ]);

    if (error) {
      console.error('Error submitting contact form:', error);
      return { error: error.message };
    }

    return result?.[0] || { success: true };
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return { error: error.message };
  }
}

/**
 * Get all site settings
 * @returns {Promise<Object>} Object with setting key-value pairs
 */
export async function getSettings() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {};
    }

    const { data, error } = await supabase.from('site_settings').select('key, value');

    if (error) {
      console.error('Error fetching settings:', error);
      return {};
    }

    const result = {};
    data?.forEach((item) => {
      result[item.key] = item.value;
    });

    return result;
  } catch (error) {
    console.error('Error in getSettings:', error);
    return {};
  }
}

/**
 * Get all active resources, optionally filtered by category or type
 * @param {Object} options - Filter options
 * @param {string|null} options.category - Optional category filter
 * @param {string|null} options.resourceType - Optional resource type filter
 * @param {boolean} options.pinnedOnly - Only return pinned resources
 * @param {boolean} options.homepageOnly - Only return resources pinned to homepage
 * @param {number} options.limit - Number of resources to return
 * @returns {Promise<Array>} Array of resource objects
 */
export async function getResources({ category = null, resourceType = null, pinnedOnly = false, homepageOnly = false, limit = 50 } = {}) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return [];
    }

    let query = supabase
      .from('resources')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }
    if (resourceType) {
      query = query.eq('resource_type', resourceType);
    }
    if (pinnedOnly) {
      query = query.eq('is_pinned', true);
    }
    if (homepageOnly) {
      query = query.eq('pin_to_homepage', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching resources:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getResources:', error);
    return [];
  }
}

/**
 * Get pinned resources for homepage display
 * @param {number} limit - Number of resources to return
 * @returns {Promise<Array>} Array of resource objects pinned to homepage
 */
export async function getHomepageResources(limit = 6) {
  return getResources({ homepageOnly: true, limit });
}

/**
 * Helper function to get fallback content by section
 * @private
 */
function getFallbackContentBySection(section) {
  const result = {};

  Object.entries(FALLBACK_CONTENT).forEach(([key, value]) => {
    // Determine section based on key
    let itemSection = 'other';
    if (key.startsWith('hero_')) itemSection = 'hero';
    if (key.startsWith('about_')) itemSection = 'about';
    if (key.startsWith('counter_')) itemSection = 'counters';
    if (key.startsWith('contact_')) itemSection = 'contact';
    if (key.startsWith('footer_')) itemSection = 'footer';

    if (itemSection === section) {
      result[key] = {
        en: value,
        ar: value, // In production, would have proper Arabic translations
      };
    }
  });

  return result;
}
