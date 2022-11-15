class PartialUpdateMixin:
    """Turns on partial update"""
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
