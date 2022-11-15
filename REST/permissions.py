from rest_framework import permissions


class UserCategoryPermission(permissions.BasePermission):
    """Permissions:
        - project managers and developers - only view;
        - admins - all;"""

    def has_permission(self, request, view):
        if request.user.category == 'AD':
            return True
        else:
            if request.method in permissions.SAFE_METHODS:
                return True
            else:
                return False


class ProjectCategoryPermission(permissions.BasePermission):
    """Permissions:
        - developers - only view;
        - admins and project managers - all;"""

    def has_permission(self, request, view):
        if request.user.category == 'AD' or request.user.category == 'PM':
            return True
        else:
            if request.method in permissions.SAFE_METHODS:
                return True
            else:
                return False
