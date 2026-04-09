import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateCourseModal = ({ open, onClose }: CreateCourseModalProps) => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
    price: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Digital Economy',
    'Digital Cognitive Organisation',
    'Digital Business Platform',
    'Digital Transformation 2.0',
    'Digital Worker & Workspace',
    'Digital Accelerators',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.level) {
      newErrors.level = 'Level is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setIsCreating(true);

    // Generate a unique course ID
    const courseId = `course-${Date.now()}`;

    // Create course object
    const newCourse = {
      id: courseId,
      title: formData.title,
      category: formData.category,
      level: formData.level,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.price) * 1.5, // 33% discount
      status: 'draft',
      createdAt: new Date().toISOString(),
      instructor: 'Current User', // Replace with actual user
      curriculum: [],
      enrollments: 0,
      rating: 0,
      reviews: 0,
    };

    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem(`course_${courseId}`, JSON.stringify(newCourse));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsCreating(false);

    // Close modal and navigate to course builder
    onClose();
    navigate(`/courses/${courseId}/builder`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-[24px] leading-[32px] font-semibold text-foreground">
              Create New Course
            </h2>
            <p className="text-[14px] text-muted-foreground mt-1">
              Fill in the basic details to get started
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Course Title */}
          <div>
            <label className="block text-[14px] font-medium text-foreground mb-2">
              Course Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Digital Transformation Fundamentals"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-[12px] text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category and Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-foreground mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-[12px] text-red-500 mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-foreground mb-2">
                Level <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger className={errors.level ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-[12px] text-red-500 mt-1">{errors.level}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-medium text-foreground mb-2">
              Course Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a brief description of what learners will gain from this course..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-[12px] text-red-500 mt-1">{errors.description}</p>
            )}
            <p className="text-[12px] text-muted-foreground mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-[14px] font-medium text-foreground mb-2">
              Course Price (USD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className={`pl-7 ${errors.price ? 'border-red-500' : ''}`}
                min="0"
                step="0.01"
              />
            </div>
            {errors.price && (
              <p className="text-[12px] text-red-500 mt-1">{errors.price}</p>
            )}
            <p className="text-[12px] text-muted-foreground mt-1">
              Set the price for your course. You can adjust this later.
            </p>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-[13px] text-blue-900">
              <strong>Next Steps:</strong> After creating your course, you'll be taken to the Course Builder where you can add curriculum, media, assessments, and more.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border sticky bottom-0 bg-white">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isCreating}
            className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Course'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
