from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        # Handle contact form submission
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Here you can add logic to save the contact form data
        # For now, we'll just return a success message
        return render(request, 'contact.html', {'success': True})
    
    return render(request, 'contact.html')

def blog(request):
    return render(request, 'blog.html')

def single_blog(request):
    return render(request, 'single_blog.html')

def performer(request):
    return render(request, 'performer.html')

def program(request):
    return render(request, 'program.html')

def venue(request):
    return render(request, 'venue.html')

def elements(request):
    return render(request, 'elements.html')