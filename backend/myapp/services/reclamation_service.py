from django.utils import timezone
from ..models import ReclamationStatusHistory

def change_reclamation_status(
    reclamation,
    new_status,
    user,
    comment=""
):
    old_status = reclamation.status

    if new_status == old_status:
        return reclamation

    allowed = VALID_STATUS_TRANSITIONS.get(old_status, [])
    if new_status not in allowed:
        raise ValueError(
            f"Invalid transition from {old_status} to {new_status}"
        )

    reclamation.status = new_status

    if new_status == 'RESOLVED':
        reclamation.closed_at = timezone.now()

    reclamation.save()

    ReclamationStatusHistory.objects.create(
        reclamation=reclamation,
        old_status=old_status,
        new_status=new_status,
        changed_by=user,
        comment=comment
    )

    return reclamation
